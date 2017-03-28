# repro rimraf

Issue: <https://github.com/bit-docs/bit-docs/issues/8>

Was not able to reproduce here. 

In that issue, the rimraf command fails if the directory it is trying to remove is not completely empty.

Here, it succeeds to remove the directory even with contents. Run:

```
node index.js
```

The directory `withsubdirs` should get removed.
