import Uwuifier from "https://deno.land/x/uwuifier/index.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const uwuifier = new Uwuifier();

app.use((ctx) => {
  if (ctx.request.url.searchParams.get("text") == null) {
    ctx.response.body = { error: "No text provided" };
    return;
  }

  ctx.response.body = uwuifier.uwuifySentence(
    ctx.request.url.searchParams.get("text")
  );
});

if (Deno.args[0] == "-c") {
    let arr = [];

    for (var i = 1; i < Deno.args.length; i++) arr.push(Deno.args[i]);

    console.log(uwuifier.uwuifySentence(arr.join(" ")));
} else {
    await app.listen({ port: Deno.env.get("PORT") || 8080 });
}