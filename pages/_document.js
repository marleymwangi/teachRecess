import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#fff" />
          <meta
            name="description"
            content="Recess is a digital platform that is built to enhance engagement and communication between parents and the school"
          />
          <meta property="og:title" content="Recess. School made easy." />
          <meta property="og:url" content="https://www.taka.earth" />
          <meta property="og:image" content="assets/logo.webp" />
          <meta name="twitter:title" content="Recess. School made easy." />
          <meta
            name="twitter:description"
            content="Recess is a digital platform that is built to enhance engagement and communication between parents and the school"
          />
          <meta name="twitter:image" content="assets/logo.webp" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="keywords"
            content="Recess is a digital platform that is built to enhance engagement and communication between parents and the school"
          />
        </Head>
        <body>
          <div
            id="loader"
            className="h-screen w-full fixed bg-secondary z-50 flex justify-center items-center"
          >
            <h1 className="text-6xl text-white font-bold">Recess</h1>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
