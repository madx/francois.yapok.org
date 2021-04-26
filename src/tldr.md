---
layout: tldr
---

::: article

%%%
title: Small talk kills async interactions
date: 2021-04-26
tags: company, methodology
%%%

Hey everyone! How goes?

:::

::: article

%%%
title: My opinion on TypeScript, beginning of 2021
date: 2021-02-15
tags: typescript, javascript
%%%

~~It sucks.~~ I don't like it.

_Edit April 2021:_ I still dislike parts of it and its excessive verbosity, but
I see and understand the value in using it, especially in a team. I still think
it is way too tied to the tooling tho (_i.e._ hard to use without VSCode)

:::

::: article

%%%
title: Recursively invalidating require cache in Node.js
date: 2020-05-14
tags: javascript, node
%%%

While working on [Fluor.js][fluor]'s website, I found myself needing to reload
node modules when in watch mode in order to update components used by the
generated pages (I'm using Server Side Rendering with React to build the
website).

Here's the snippet I used to recursively invalidate a module's cache entry and
all its dependencies:

```js
function removeFromCache(moduleId) {
  const cached = require.cache[moduleId]

  if (!cached) {
    return
  }

  // LIB_ROOT and SITE_ROOT are where my source files reside. I avoid reloading
  // node_modules as it causes some issues with the rendering process
  const ownModule = (mod) =>
    mod.path.startsWith(LIB_ROOT) || mod.path.startsWith(SITE_ROOT)

  cached.children.filter(ownModule).forEach((mod) => removeFromCache(mod.id))
  delete require.cache[moduleId]
}
```

:::

::: article

%%%
title: Five-line TailwindCSS-based styled components
date: 2020-05-14
tags: javascript
%%%

I recently discovered [TailwindCSS][tailwind] and I think it's a great tool to
be able to quickly build fancy websites without spending too much time fiddling
with the CSS.

I came up with a five-line React component that let's you write
`styled-components`-like components using Tailwind class names:

```js
import React from "react"
import clsx from "clsx"

export default (Component, ...tailwindStyles) => ({ className, ...props }) => (
  <Component className={clsx(...tailwindStyles, className)} {...props} />
)
```

(I know, that's actually 6 lines with the blank one 😏)

Usage is very simple as well:

```js
const Warning = styled("div", [
  "my-4",
  "p-4",
  "bg-orange-100",
  "border",
  "border-orange-300",
  "text-orange-800",
  "text-sm",
  "rounded-lg",
  "flex",
])
```

Bonus points for the regular syntax instead of the funky (read: ugly) mix of
template strings and CSS that you're used to with `styled-components`.

**EDIT a few hours later**: I realized I was missing the ability to derive
styles from `props`, so I added it!

```js
import React from "react"
import clsx from "clsx"

function isFunction(object) {
  return Boolean(object && object.constructor && object.call && object.apply)
}

export default (Component, ...tailwindStyles) => ({ className, ...props }) => {
  const resolvedStyles = tailwindStyles.map((style) =>
    isFunction(style) ? style(props) : style
  )
  return <Component className={clsx(...resolvedStyles, className)} {...props} />
}

// Example usage:
export default styled(
  "button",
  (props) => [
    "rounded",
    "py-3",
    "px-4",
    "font-bold",
    "shadow-md",
    "leading-none",
    "focus:outline-none",
    "focus:shadow-outline",
    props.disabled ? "bg-green-200" : "bg-green-400",
    props.disabled ? "text-green-500" : "text-blue-900",
  ],
  (props) => ({
    "hover:bg-green-300": !props.disabled,
    "hover:text-green-800": !props.disabled,
    "cursor-not-allowed": props.disabled,
  })
)
```

:::

::: article

%%%
title: How I ditched Redux
date: 2019-11-06
tags: javascript
%%%

<blockquote class="update">
<strong>Update March 2020:</strong> Use <a href="https://reactjs.org/docs/hooks-reference.html#usereducer">useReducer</a>!
</blockquote>

[Redux][redux] is probably the most used state management library for
[React][react]. However, even its own creator has trouble using it, probably
because it is one massive piece of bloat and boilerplate.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Reading some Redux example code I wrote four years ago and I have no effing idea what&#39;s going on there</p>&mdash; Dan Abramov (@dan_abramov) <a href="https://twitter.com/dan_abramov/status/1191487232038883332?ref_src=twsrc%5Etfw">November 4, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I used to solve that problem using [elfi][elfi], a dead simple state management
library that I wrote a few years ago. Elfi is a 50 LOC lib that does not carry
any difficult to grasp concepts like _reducers_, _thunks_ or whatever, but
instead only relies on functions.

But given the recent additions to React, even elfi is useless now. Using [React
Contexts][react:contexts], I simply implement state management in my top level
component and pass the state management functions through the context:

```javascript
// AppContext.js
export const AppContext = React.createContext()

// App.js
function App() {
  // The global application state. We use an object here but an
  // immutable value is also a pretty solid choice
  const [state, setState] = useState({ counter: 0 })

  // The dispatch function updates our state by applying a given
  // function on the previous state
  const dispatch = (fn, ...args) => setState(fn(state, ...args))

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Button />
    </AppContext.Provider>
  )
}

// Button.js
function Button() {
  const { state, dispatch } = useContext(AppContext)

  return <button onClick={() => dispatch(increment)}>{state.counter}</button>
}

function increment(state) {
  return { ...state, counter: state.counter + 1 }
}
```

[Try it out on CodePen](https://codepen.io/madx/pen/LYYmzqK)

:::

[elfi]: https://github.com/madx/elfi
[fluor]: https://fluorjs.github.io
[react:contexts]: https://reactjs.org/docs/context.html
[react]: https://reactjs.org/
[redux]: https://redux.js.org/
[tailwind]: https://tailwindcss.com/
