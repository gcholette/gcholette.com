## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.12.0/highlight.min.js"
  integrity="sha384-KnPvYPx1poT554tHDV1nuYV9sOkh4cZPBvLZQlXgJmoRQZPdgQNwL50/xq9kynp9"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.12.0/languages/go.min.js"
  integrity="sha384-orYKHAs3chK3oDMQLy5ywrzoY8z9zvzfmNIjmVxKXioAUtwDhP+xf6THWYSI/43Y"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-A3L5Tf7tUTEvvb7CBQ7/Ss1TL493yDjIre9lL9+hewzsmlGvDaF0zr2jtRL/as9+ /es/languages/c.js
sha384-QjLTklOpGRj5BiUGiD7/7RYVgazp8V+oQvLPmM+goByoChSDDxbVf7ztjZ5MtHO2 /es/languages/c.min.js
sha384-/FFsa5X7Nn8shMYLbVUb0WRQA+ay+XKibuVCTYwN7XJNcs3hhMaIvUEl87d6ULcv /es/languages/x86asm.js
sha384-Rkq9CZ04qdVs0aJLp8vSLGoOejY+m/XxsKFZ9BwdXW/9PFCxs6o5ebFulZXaDQRf /es/languages/x86asm.min.js
sha384-++jr2IZH8qZUHclpwLKPdPB67oloAwlp6bVn6IOBm1PRyrATGwIJDemLwIjTXWhI /languages/c.js
sha384-XUlYYDNkxUkC5F86/mGCoT9eEdPUigCR+8ihyrqFat6tMD0/GRHkorEtHKgBSS7D /languages/c.min.js
sha384-xebVCRDgDosTvpLuJmoJn/2/WFYgcgJkVcMAh4kNwgbC/gThZaYEaqMVTDXtk0fP /languages/x86asm.js
sha384-Cf3xzgfOHCjwxHFvuO1cpP6GHSth3EMwNXmQ1fdOonZL5fHRQx6cICV3YkQ74oVu /languages/x86asm.min.js
sha384-r1X+r289d6jqlSRjmcfMXIc5NL7VF5Jsw3Bu6sq8xkParowLSF5nnC+gOWmLoGJk /highlight.js
sha384-ycvR94McBRCe6BKDMlOjVsN1z9B3xfIeEc4zIZ7IxLLA53hE7RN8O3eleYM+IlFL /highlight.min.js
```

