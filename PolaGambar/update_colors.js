const fs = require('fs');
const path = '/Users/syifasabrina/Documents/Media_Alpam/PolaGambar/style.css';

let css = fs.readFileSync(path, 'utf8');

// 1. Update :root variables
const newRoot = `:root {
  /* Tosca */
  --tosca-light:  #ccfbf1;
  --tosca-mid:    #14b8a6;
  --tosca-deep:   #0d9488;
  
  /* Blue */
  --blue-light:   #dbeafe;
  --blue-mid:     #3b82f6;
  --blue-deep:    #1d4ed8;
  --blue-text:    #1e3a8a;
  
  /* Red */
  --red-light:    #fee2e2;
  --red-mid:      #ef4444;
  --red-deep:     #b91c1c;
  
  --green-glow:   #10b981;
  --cream:        #ffffff;`;

css = css.replace(/:root\s*\{[\s\S]*?--cream:\s*#ffffff;/m, newRoot);

// 2. Update Body Backgrounds
css = css.replace(/background: linear-gradient\(160deg, #7dd3fc 0%, #fef08a 50%, #7dd3fc 100%\);/g, 
  'background: linear-gradient(160deg, var(--tosca-light) 0%, var(--blue-light) 50%, var(--tosca-light) 100%);');
css = css.replace(/background: radial-gradient\(circle, #fde047, #f59e0b\);/g, 
  'background: radial-gradient(circle, var(--red-mid), var(--red-deep));');
css = css.replace(/background: radial-gradient\(circle, #38bdf8, #0284c7\);/g, 
  'background: radial-gradient(circle, var(--blue-mid), var(--blue-deep));');

// 3. Update Cover
css = css.replace(/linear-gradient\(160deg, #fff9f0 0%, #fce8d8 60%, #f9d9e7 100%\)/g, 
  'linear-gradient(160deg, var(--tosca-light) 0%, var(--blue-light) 60%, var(--red-light) 100%)');
css = css.replace(/var\(--yellow-warm\)/g, 'var(--red-mid)'); // for buttons / badges
css = css.replace(/var\(--yellow-pale\)/g, 'var(--red-light)');
css = css.replace(/var\(--yellow-text\)/g, 'var(--red-deep)');
css = css.replace(/var\(--yellow-soft\)/g, 'var(--red-mid)');

// 4. Update specific elements for better vibe
// Boxes border: keep blue-mid
// Box label: keep blue-deep/blue-light

// 5. Instruction Card -> make it Tosca
css = css.replace(/\.instruction-card \{\s*display: flex;\s*align-items: flex-start;\s*gap: 10px;\s*background: var\(--red-light\);\s*border: 3px dashed var\(--red-mid\);/m, 
  `.instruction-card {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  background: var(--tosca-light);\n  border: 3px dashed var(--tosca-mid);`);

css = css.replace(/\.instruction-text \{\s*font-size: var\(--fs-base\);\s*line-height: 1\.6;\s*color: var\(--red-deep\);/m, 
  `.instruction-text {\n  font-size: var(--fs-base);\n  line-height: 1.6;\n  color: var(--tosca-deep);`);

css = css.replace(/\.instruction-text strong \{ color: #8a6200; \}/g, 
  `.instruction-text strong { color: var(--tosca-deep); }`);

// 6. Fix Button Check Gradient
css = css.replace(/background: linear-gradient\(135deg, var\(--blue-deep\), #3d8fc9\);/g, 
  'background: linear-gradient(135deg, var(--blue-mid), var(--blue-deep));');
css = css.replace(/box-shadow: 0 6px 18px rgba\(90,173,227,\.45\);/g, 
  'box-shadow: 0 6px 18px rgba(59, 130, 246, 0.45);');
css = css.replace(/box-shadow: 0 10px 24px rgba\(90,173,227,\.5\);/g, 
  'box-shadow: 0 10px 24px rgba(59, 130, 246, 0.5);');

// 7. Fix Start btn Box shadow
css = css.replace(/box-shadow: 0 6px 0 #3d8fc9, 0 10px 24px rgba\(90, 173, 227, 0\.4\);/g, 
  'box-shadow: 0 6px 0 var(--blue-deep), 0 10px 24px rgba(59, 130, 246, 0.4);');
css = css.replace(/box-shadow: 0 8px 0 #3d8fc9, 0 14px 28px rgba\(90, 173, 227, 0\.5\);/g, 
  'box-shadow: 0 8px 0 var(--blue-deep), 0 14px 28px rgba(59, 130, 246, 0.5);');
css = css.replace(/box-shadow: 0 2px 0 #3d8fc9, 0 4px 10px rgba\(90, 173, 227, 0\.4\);/g, 
  'box-shadow: 0 2px 0 var(--blue-deep), 0 4px 10px rgba(59, 130, 246, 0.4);');

// 8. Dropzone
// Let's make dropzone Tosca instead of Red, red is for errors
css = css.replace(/\.pattern-box\.dropzone \{\s*border-color: var\(--red-mid\);\s*border-style: dashed;\s*background: var\(--red-light\);\s*\}/m, 
  `.pattern-box.dropzone {\n  border-color: var(--tosca-mid);\n  border-style: dashed;\n  background: var(--tosca-light);\n}`);

css = css.replace(/\.pattern-box\.dropzone\.drag-over \{\s*border-color: var\(--blue-deep\);\s*background: var\(--blue-light\);\s*box-shadow: 0 0 0 4px rgba\(90,173,227,\.3\);\s*\}/m, 
  `.pattern-box.dropzone.drag-over {\n  border-color: var(--tosca-deep);\n  background: var(--tosca-light);\n  box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.3);\n}`);

css = css.replace(/\.dropzone \.box-label \{\s*background: var\(--red-mid\);\s*color: var\(--red-deep\);\s*\}/m, 
  `.dropzone .box-label {\n  background: var(--tosca-mid);\n  color: white;\n}`);

// 9. Hint glow and popup hint
css = css.replace(/rgba\(245,200,66,\.3\)/g, 'rgba(239, 68, 68, 0.3)');
css = css.replace(/rgba\(245,200,66,\.2\)/g, 'rgba(239, 68, 68, 0.2)');
css = css.replace(/#fffef0/g, '#fef2f2');

fs.writeFileSync(path, css);
console.log("Colors updated!");
