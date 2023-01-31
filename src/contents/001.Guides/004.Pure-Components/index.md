# Pure Components

> Same props and state then the same output.

Pure components are components that always produce the same output (view) with the same props and state.
Different from React, any components of Fiddlehead are pure without wrapping them with `memo` HOC.
This means, components will not re-rendered without changes in their props or states,
even when their parent components re-rendered.
We use the shallow comparison to determine if props are changed or not.
