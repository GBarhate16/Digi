# Assets Folder

## Adding Your Logo

To add your custom logo to the navbar:

1. **Add your logo file** to this folder (e.g., `logo.svg`, `logo.png`, `logo.webp`)
2. **Update the import** in `Navbar.tsx`:
   ```tsx
   import logoImage from '../assets/your-logo-file.svg';
   ```
3. **Replace the logo div** in the navbar:
   ```tsx
   <img 
     src={logoImage} 
     alt="Digitos Logo" 
     className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
   />
   ```

## Current Implementation

Currently using a gradient "D" logo as a placeholder. The logo appears in:
- Navbar (with hover effects)
- Preloader (animated)
- HTML bridge preloader (immediate)

## Logo Specifications

- **Recommended size**: 32x32px to 40x40px
- **Format**: SVG (preferred) or PNG with transparent background
- **Colors**: Should work well on black background
- **Style**: Modern, professional, matches your brand
