import { minify } from 'html-minifier';
import { prerendering } from '$app/env';

const minification_options = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  decodeEntities: true,
  html5: true,
  ignoreCustomComments: [/^#/],
  minifyCSS: true,
  minifyJS: false,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true,
};

export async function handle({ event, resolve }) {
  const response = await resolve(event);

  if (
    prerendering &&
    response.headers.get('content-type') &&
    response.headers.get('content-type').startsWith('text/html')
  ) {
    const body = await response.text();

    return new Response(body, response);
  }

  return response;
}
