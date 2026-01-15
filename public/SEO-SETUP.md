# SEO & Social Media Setup Guide

## 📸 Required Images

You need to add the following images to the `/public` folder:

### 1. **Favicon** (Browser Tab Icon)
- `favicon.ico` - 32x32px or 16x16px
- Copy `aisod-logo.png` and convert to `.ico` format
- Tools: https://favicon.io/ or https://realfavicongenerator.net/

### 2. **PWA Icons** (Progressive Web App)
- `icon-192.png` - 192x192px (Android home screen)
- `icon-512.png` - 512x512px (High-res Android)
- Resize `aisod-logo.png` to these dimensions

### 3. **Apple Touch Icon**
- `apple-icon.png` - 180x180px (iOS home screen)
- Resize `aisod-logo.png` to 180x180px

### 4. **Open Graph Image** (Social Media Preview)
- `og-image.png` - 1200x630px
- Create a branded image with:
  * AISOD logo
  * Text: "AISOD 3A - Namibia's #1 AI Assistant"
  * Blue gradient background (#2563eb)
  * Professional design
- Tools: Canva, Figma, or Photoshop

## 🎨 Design Recommendations

### OG Image Template (1200x630px):
```
┌─────────────────────────────────────┐
│                                     │
│     [AISOD Logo - Centered]         │
│                                     │
│   AISOD 3A                          │
│   Namibia's #1 AI Assistant         │
│                                     │
│   AI • Automations • Agents         │
│                                     │
└─────────────────────────────────────┘
Background: Blue gradient (#2563eb to #1d4ed8)
Text: White, bold, Inter font
```

## 🔧 Quick Setup Commands

### Using ImageMagick (if installed):
```bash
# Convert logo to favicon
convert aisod-logo.png -resize 32x32 favicon.ico

# Create PWA icons
convert aisod-logo.png -resize 192x192 icon-192.png
convert aisod-logo.png -resize 512x512 icon-512.png

# Create Apple icon
convert aisod-logo.png -resize 180x180 apple-icon.png
```

### Manual Steps:
1. Go to https://favicon.io/favicon-converter/
2. Upload `aisod-logo.png`
3. Download generated files
4. Copy to `/public` folder

## ✅ Verification Checklist

After adding images, verify:

- [ ] Favicon appears in browser tab
- [ ] Social media preview works (use https://www.opengraph.xyz/)
- [ ] PWA install prompt works on mobile
- [ ] Apple touch icon shows when saving to iOS home screen
- [ ] Google Search Console verification
- [ ] Twitter Card validator: https://cards-dev.twitter.com/validator
- [ ] Facebook debugger: https://developers.facebook.com/tools/debug/

## 🔍 SEO Features Already Implemented

✅ Meta tags (title, description, keywords)
✅ Open Graph tags (Facebook, LinkedIn)
✅ Twitter Card tags
✅ Structured data (JSON-LD)
✅ Robots.txt
✅ Sitemap.xml
✅ Manifest.json (PWA)
✅ Canonical URLs
✅ Mobile-optimized
✅ Multilingual support

## 📊 Google Search Console Setup

1. Go to https://search.google.com/search-console
2. Add property: `aisod.cloud`
3. Verify using HTML tag method
4. Replace verification code in `layout.tsx`:
   ```typescript
   verification: {
     google: 'your-actual-verification-code',
   }
   ```
5. Submit sitemap: `https://aisod.cloud/sitemap.xml`

## 🎯 Next Steps

1. **Create OG image** with design specifications above
2. **Generate favicon and icons** from AISOD logo
3. **Test social sharing** on Facebook, Twitter, LinkedIn
4. **Submit to search engines**:
   - Google Search Console
   - Bing Webmaster Tools
5. **Monitor performance** with Google Analytics

---

**Need help?** Contact AISOD Tech Team
📧 info@aisodinstitute.tech
📞 +264 81 497 1482
