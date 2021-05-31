import { createServer } from "miragejs";
import { getEuroJackpotDrawingByDate, getEuroJackpotLastDrawing } from "./eurojackpot";

export default function () {
  createServer({
    routes() {
      this.get("https://lottoland.com/api/drawings/euroJackpot", () => {
        return getEuroJackpotLastDrawing();
      });

      this.get("https://lottoland.com/api/drawings/euroJackpot/:date", (_, request) => {
        const date = request.params.date;
        return getEuroJackpotDrawingByDate(date);
      });
    },
  });
}
