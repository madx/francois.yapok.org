#!/usr/bin/env node

import fs from "fs/promises"
import path from "path"
import meow from "meow"
import fastGlob from "fast-glob"
import marked from "marked"
import postcss from "postcss"
import autoprefixer from "autoprefixer"
import tailwindcss from "tailwindcss"
import cssnano from "cssnano"

const DIST_DIR = "dist"

const cli = meow(`
  Usage
    $ weave build
    $ weave deploy
`)

const [command] = cli.input

switch (command) {
  case "build":
    build()
    break
  case "deploy":
    deploy()
    break
  default:
    cli.showHelp()
}

async function build() {
  const sources = await fastGlob(["src/**/*"])

  for (const source of sources) {
    const destination = source.replace("src", DIST_DIR)
    const extension = path.extname(destination).slice(1)
    const destDir = path.dirname(destination)

    await fs.mkdir(destDir, { recursive: true })

    const sourceStat = await fs.stat(source)
    const destinationStat = await fs.stat(destination)

    if (destinationStat.mtime > sourceStat.mtime) {
      console.log(`SKIP ${source}`)
      continue
    }

    switch (extension) {
      case "css":
        await makeCSS(source, destination)
        console.log(`BUILD ${source} -> ${destination}`)
        break
      default:
        await fs.copyFile(source, destination)
        console.log(`COPY ${source} -> ${destination}`)
        break
    }
  }
}

async function makeCSS(source, destination) {
  const css = await fs.readFile(source)
  const compiled = await postcss([tailwindcss, autoprefixer, cssnano]).process(
    css,
    {
      from: source,
      to: destination,
    }
  )
  console.log(compiled)
  await fs.writeFile(destination, compiled.css)
}

function deploy() {}
