import { Config } from "./Config";
import { WeatherProvider } from "./WeatherProvider";
import { WeatherWunderground } from "./WeatherWunderground";

export class WeatherFactory {
    private static PROVIDER_INSTANCE: WeatherProvider = null;

    public static getProvider(): WeatherProvider {
        if (!WeatherFactory.PROVIDER_INSTANCE) {
            let config = Config.getInstance().get("scheduler").weather;
            if (config && config.provider === "wunderground") {
                WeatherFactory.PROVIDER_INSTANCE = new WeatherWunderground();
            } else {
                throw new Error("Unknown weather provider: " + config.provider);
            }
        }
        return WeatherFactory.PROVIDER_INSTANCE;
    }
}