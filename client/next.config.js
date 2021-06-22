module.exports = {
  env: {
    API_URL: process.env.API_URL,
    ADMIN_USER: process.env.ADMIN_USER,
    NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
    TEST_NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY: process.env.TEST_NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
    NEXT_PUBLIC_MAGIC_SECRET_KEY: process.env.NEXT_PUBLIC_MAGIC_SECRET_KEY,
    TEST_MAGIC_SECRET_KEY: process.env.TEST_MAGIC_SECRET_KEY,
    TOKEN_NAME: process.env.TOKEN_NAME,
    ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
      issuer: {
        test: /\.(js|ts)x?$/,
      },
    });
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    });

    return config;
  },
};
