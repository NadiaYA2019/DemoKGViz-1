    import {createStore} from "vuex";
import {dateModule} from "./date.store";
import {parametersModule} from "./parameters.store";
import {stationsModule} from "./stations.store";
import {weatherModule} from "./weather.store";
import {weatherParameterModule} from "./weatherParameters.store";
export const store = createStore({
    namespace: false,
    modules: {
        dateModule: dateModule,
        parametersModule: parametersModule,
        stationsModule: stationsModule,
        weatherModule: weatherModule,
        weatherParameterModule: weatherParameterModule,
    }
})