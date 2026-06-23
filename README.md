1. npm create vite@latest my-project
2. cd my-project
3. npm install tailwindcss @tailwindcss/vite

4. import { defineConfig } from 'vite'
   import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
plugins: [
tailwindcss(),
],
})

5. @import "tailwindcss";

6. @custom-variant dark (&:where(.dark, .dark \*)); // for light & dark theme

7. npm run dev

8. <!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/style.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
