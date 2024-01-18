import Head from "next/head";

export default function Metatags({
  title = "Codehub",
  description = "Learn Programing",
  image = "",
}) {
  return (
    <Head>
      <title>{title}</title>

      <meta charset="UTF-8" />
      <meta name="description" content="Free Web tutorials" />
      <meta name="keywords" content="Python, Java, C#, JavaScript" />
      <meta name="author" content="Boris Savianov" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta
        name="google-site-verification"
        content="mONsFBpIM2RK6Lf0ndYkhGK1F3pG0y6sSs4bYSqmjaE"
      />
    </Head>
  );
}
