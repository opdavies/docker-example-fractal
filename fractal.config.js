"use strict"

const fractal = (module.exports = require("@frctl/fractal").create())
const mandelbrot = require("@frctl/mandelbrot")
const path = require("path")

fractal.set("project.title", "docker-example-fractal")

const twig = require("@frctl/twig")({
  functions: {
    modify(baseClass, modifiers = []) {
      // Ensure we have an array of modifiers.
      const modifiersArray = Array.isArray(modifiers) ? modifiers : [modifiers]

      // Loop over them and prepend the baseclass.
      const classArray = modifiersArray.map(
        (modifier) => `${baseClass}--${modifier}`
      )
      classArray.unshift(baseClass)
      return classArray.join(" ")
    },
  },
})

fractal.components.engine(twig)
fractal.components.set("default.preview", "@preview")
fractal.components.set("ext", ".twig")

fractal.components.set("path", path.join(__dirname, "components"))

fractal.docs.engine("@frctl/twig")
fractal.docs.set("path", path.join(__dirname, "docs"))

fractal.web.set("builder.dest", path.join(__dirname, "build"))
fractal.web.set("static.path", path.join(__dirname, "public"))

fractal.web.theme(
  mandelbrot({
    format: "yaml",
    lang: "en-GB",
    skin: {
      name: 'default',
      accent: '#114b71',
      complement: '#fff',
      links: '#114b71',
    }
  })
)

fractal.components.set('default.status', 'wip');
fractal.components.set('statuses.wip.label', 'Work in progress');
