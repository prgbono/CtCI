**Goal** -> [This](https://dev.to/riyon_sebastian/building-a-robust-frontend-error-handling-system-with-axios-and-custom-hooks-27k3) is what we are implementing here. 

The folder js-error-handling-system is where the package.json is with all the needed dependencies.

Flujo:
1. Main.jsx renderiza App
2. App renderiza ProductList y ToastContainer (para los toasts)
3. ProductList llama al custom hook `useApi` para hacer llamadas http pasando 2 parámetros:
	-   *apiFunc*: la función que hace el servicio que queremos de entre todos los especificados en la lista de servicios (ProductService). Este servicio hará la llamada http y actualizará el estado correspondiente dependiendo del resultado de ésta.
	-   *immediate*: booleano para la inmediatez de la llamada
4. UseApi tiene como retorno data, loading, error, y la propia función de respuesta.
5. En useApi se ejecuta el servicio (función asíncrona `apiFunc`)
6. El servicio tiene un axiosInstance. Éste viene definido del archivo *axiosInstance.js* con un `baseURL` y unos `headers` prestablecidos para todas las peticiones.
7. En el servicio getProducts, que es el que estamos usando aquí, se lanza un get (`axiosInstance.get('/', {params}`). Los parámetros de get son:
	- *'/'* - este string será añadido al valor de `baseURL`
	- *{params}* - Parámetros de la request que están definidos en el useEffect de `ProductList`
8. La llamada se hace en el `useEffect` de `ProductList`
9. Hay definido un interceptor de axios en la instancia de axios utilizada. Se intercepta la response, es decir, la respuesta del server (`axiosInstance.interceptors.response.use`). También se podría interceptar la request (por ejemplo para añadir headers o cualquier cosa con `axiosInstance.interceptors.request.use`)
10. En este interceptor, se retorna la respuesta si ésta viene sin errores o se rechaza la promesa (`Promise.reject(error)`) en caso de que no sea así. 
11. Si hay error se evalúa éste y se lleva de vuelta a la estructura `try-catch` de *useApi*, que a través de los estados renderizará `ProductList` debidamente.
12. Los errores están manejados en el archivo `axiosInstance.js`, en la parte de `interceptor.response.use`


**Mejora 1:** En la línea: https://github.com/prgbono/CtCI/blob/main/js-error-handling-system/src/utils/axiosInstance.js#L23
1. Error Parsing Customization:
- Categorize errors (e.g., network vs. validation) and provide actionable messages to help users understand issues and possible solutions.
- Error Categorization: The interceptor checks the type property in the error response to determine the nature of the error (e.g., validation or authentication).
2. Actionable Messages: 
- Provides users with specific error messages based on the error type, enhancing their understanding and ability to respond appropriately.

**Puntos importantes:**
- How to set up centralized error handling with Axios interceptors.
- The role of a custom useApi hook for managing API request state.
- The benefits of using service modules to organize API logic (ProductService y UserService)
- Advanced techniques for user-friendly error handling, including retry options and request cancellation.
	

