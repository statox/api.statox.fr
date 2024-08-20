# Views

The templates in this directory neeed to be rendered with

```typescript
res.render('viewName', { data });
```

Where `viewName` corresponds to the name of the template file and `data` is the object used in the template to render some data.

See `src/libs/routes/clipboard/staticView.ts` for an example.
