import { defineComponent, h, ref, computed, inject } from "vue";
const RouteKey = Symbol("RouteKey");

// parse the path and query params utility (e.g. /about?name=John&age=30 => { path: '/about', query: { name: 'John', age: 30 } })
function parsePath(url) {
  const [pre, _query] = url.split("?");
  const path = pre.replace(
    `${window.location.protocol}//${window.location.host}`,
    "",
  );
  const queryParams = new URLSearchParams(_query);
  const query = {};

  queryParams.forEach((value, key) => {
    query[key] = isNaN(value) ? value : Number(value);
  });

  return { path, query };
}

export function createRouter(options) {
  const { routes } = options; // 👈 you'll need this
  const { pathname, search } = window.location;
  const parsed = parsePath(`${pathname}${search}`);
  const route = ref(parsed);
  const routePath = computed(() => route.value.path); // 👈 you'll need this
  const origin = window.location.origin; // http://localhost:5173 // 👈 you'll need this

  return {
    // 👇 CODE HERE! 👇
    // You will code within the install method to complete the challenge 👇
    install(app) {
      app.provide(RouteKey, route);
      // create a RouterView component, which will render the current route component
      // along with some extra HTML to mimic a browser
      // just like with Vue Router all the RouteRecords are set via options.routes (see main.js)
      const RouterView = defineComponent(() => {
        const activePage = computed(() =>
          routes.find((route) => route.path === routePath.value),
        );

        // <div class="mockup-browser-wrapper">
        //   <!-- 👈 Notice the classes that need to be added-->
        //   <div class="mockup-browser-toolbar">
        //     <!-- 👈 and here, etc-->
        //     <div class="mockup-browser-url">
        //       <span>http://localhost:5173</span>
        //       <!-- 👇 The value of this input should be the current route path -->
        //       <!-- Whenever you type into the input if a route that matches
        //       the input value exists, you should navigate to that route -->
        //       <input />
        //     </div>
        //   </div>
        //   <div class="mockup-browser-content">
        //     <!-- 👉 The page component rendered here 👈 -->
        //   </div>
        // </div>

        return () => {
          // VNode
          return h("div", { class: "mockup-browser-wrapper" }, [
            h(
              "div",
              { class: "mockup-browser-toolbar" },
              h("div", { class: "mockup-browser-url" }, [
                h("span", { innerHTML: `${origin}` }),
                h("input", {
                  value: routePath.value,
                  // onKeyup: (e) => {
                  //   route.value = parsePath(`${origin}${e.target.value}`);
                  // },
                  onInput: (e) => {
                    const matchingRoute = routes.find(
                      (route) => route.path === e.target.value,
                    );
                    if (matchingRoute) {
                      getRouter(route).push(e.target.value);
                    }
                  },
                }),
              ]),
            ),
            h("div", { class: "mockup-browser-content" }, [
              activePage.value
                ? h(activePage.value.component)
                : h("span", "Page not found"),
            ]),
          ]);
        };
      }, {});

      app.component("RouterView", RouterView);
    },
  };
}

//👇  you'll need this
function getRouter(route) {
  return {
    push(_path) {
      const { path, query } = parsePath(_path);
      route.value.path = path;
      route.value.query = query;
      history.pushState(null, null, _path);
    },
  };
}

export function useRouter() {
  const route = inject(RouteKey);
  return getRouter(route);
}

export function useRoute() {
  const route = inject(RouteKey);

  return route.value;
}
