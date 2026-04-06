import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '../../../../lib/supabase';

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
        users (name, surname, email, phone, location)
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
        users (name, surname, email, phone, location)
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
      users (name, surname, email)
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
