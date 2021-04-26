exports.render = (data) => `<!doctype html>
<html>
  <head>
    <title>tl;dr - François Vaux</title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content="François Vaux" />
    <meta
      name="description"
      content="Development-related tips and articles by François Vaux, full-stack developer"
    />
    <link rel="shortcut icon" href="/img/favicon.png" />
    <link rel="preload" as="style" href="../css/inter.css" />
    <link rel="preload" as="style" href="../css/base.css" />
    <link rel="preload" as="style" href="../css/tldr.css" />
    <link rel="stylesheet" href="../css/inter.css" />
    <link rel="stylesheet" href="../css/base.css" />
    <link rel="stylesheet" href="../css/tldr.css" />
    <meta property="og:title" content="François Vaux" />
    <meta
      property="og:description"
      content="Development-related tips and articles by François Vaux, full-stack developer"
    />
    <meta property="og:image" content="/img/photo.png" />
    <meta property="og:url" content="https://francois.yapok.org/tldr/" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content="@madx" />
  </head>
  <body
    class="min-h-screen max-w-full flex flex-col items-center bg-white font-normal font-inter text-gray-900 p-2"
  >
    <header class="mt-8 mb-12 flex flex-col items-center">
      <h1 class="text-3xl font-black text-red-800">tl;dr</h1>
      <h2 class="text-2xl font-light text-gray-600 text-center">
        dev tips &amp; articles by François Vaux
      </h2>
    </header>
    <main class="w-full max-w-3xl">${data.content}</main>
    <footer class="text-sm mt-8 mb-4">
      <a href="/">
        <img src="/img/favicon.png" class="inline w-6 h-6 ml-1 rounded-full" />
        François Vaux</a
      >
      - © 2020 &amp; up
    </footer>
    <script
      async
      defer
      data-website-id="c3e1a878-6ee7-4b60-9ab4-2dd60f4cee8c"
      src="https://umami.yapok.org/umami.js"
    ></script>
  </body>
</html>
`
