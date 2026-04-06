import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '../../../../lib/supabase';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function callOpenRouter(messages: any[]): Promise<any> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://aisod.cloud',
      'X-Title': 'AISOD Admin Sync'
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      messages: messages,
      temperature: 0,
      max_tokens: 200
    })
  });
  const data = await response.json();
  return data;
}

export async function POST(request: NextRequest) {
  const token = request.headers.get('x-admin-token');
  
  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  
  if (body.action !== 'sync') {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  // Find all conversations without a user_id
  const { data: orphanedConvs, error: fetchError } = await supabaseServer
    .from('conversations')
    .select('id, messages')
    .is('user_id', null);

  if (fetchError || !orphanedConvs || orphanedConvs.length === 0) {
    return NextResponse.json({ synced: 0 });
  }

  let synced = 0;

  for (const conv of orphanedConvs) {
    try {
      const messages = conv.messages as any[];
      if (!messages || messages.length === 0) continue;

      const extractPrompt = [
        {
          role: 'system',
          content: 'Extract the user\'s name, surname, age, email, and phone number from this conversation. Return ONLY valid JSON with no other text. Use null for any field not found. Example: {"name": "John", "surname": "Doe", "email": "john@example.com", "phone": "+26481497148", "age": 25}'
        },
        ...messages
      ];

      const extractResponse = await callOpenRouter(extractPrompt);
      const rawContent = extractResponse.choices?.[0]?.message?.content;
      if (!rawContent) continue;

      const jsonStr = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const extracted = JSON.parse(jsonStr);

      if (!extracted.name && !extracted.surname && !extracted.email && !extracted.phone) continue;

      let userId: string | null = null;

      if (extracted.email) {
        const { data: existingByEmail } = await supabaseServer
          .from('users')
          .select('id')
          .eq('email', extracted.email)
          .single();
        if (existingByEmail) userId = existingByEmail.id;
      }

      if (!userId && extracted.phone) {
        const { data: existingByPhone } = await supabaseServer
          .from('users')
          .select('id')
          .eq('phone', extracted.phone)
          .single();
        if (existingByPhone) userId = existingByPhone.id;
      }

      if (!userId) {
        const { data: newUser, error: userError } = await supabaseServer
          .from('users')
          .insert({
            name: extracted.name || '',
            surname: extracted.surname || '',
            email: extracted.email || null,
            phone: extracted.phone || null,
            age: extracted.age || null,
          })
          .select('id')
          .single();

        if (userError || !newUser) continue;
        userId = newUser.id;
      } else {
        const updateFields: any = {};
        if (extracted.name) updateFields.name = extracted.name;
        if (extracted.surname) updateFields.surname = extracted.surname;
        if (extracted.email) updateFields.email = extracted.email;
        if (extracted.phone) updateFields.phone = extracted.phone;
        if (extracted.age) updateFields.age = extracted.age;

        if (Object.keys(updateFields).length > 0) {
          await supabaseServer
            .from('users')
            .update(updateFields)
            .eq('id', userId);
        }
      }

      await supabaseServer
        .from('conversations')
        .update({ user_id: userId })
        .eq('id', conv.id);

      synced++;
    } catch (e) {
      console.error('Sync error for conversation', conv.id, e);
    }
  }

  return NextResponse.json({ synced });
}

export async function GET(request: NextRequest) {
  const token = request.headers.get('x-admin-token');
  
  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (type === 'users') {
    const { data, error } = await supabaseServer
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  }

  if (type === 'conversations') {
    const { data, error } = await supabaseServer
      .from('conversations')
      .select(`
        *,
        users (name, surname, email, phone, location, age)
      `)
      .order('created_at', { ascending: false });
    
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  }

  if (type === 'conversation-detail') {
    const id = searchParams.get('id');
    const { data, error } = await supabaseServer
      .from('conversations')
      .select(`
        *,
        users (name, surname, email, phone, location, age)
      `)
      .eq('id', id)
      .single();
    
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  }

  // Dashboard stats
  const { count: userCount } = await supabaseServer
    .from('users')
    .select('*', { count: 'exact', head: true });

  const { count: convCount } = await supabaseServer
    .from('conversations')
    .select('*', { count: 'exact', head: true });

  const { data: recentConvs } = await supabaseServer
    .from('conversations')
    .select(`
      *,
      users (name, surname, email, age)
    `)
    .order('created_at', { ascending: false })
    .limit(10);

  return NextResponse.json({
    stats: {
      users: userCount || 0,
      conversations: convCount || 0,
    },
    recentConversations: recentConvs || [],
  });
}
