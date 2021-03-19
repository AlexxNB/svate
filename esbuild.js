const {build} = require(`esbuild`);
const { derver } = require("derver");
const sveltePlugin = require(`esbuild-svelte`);
const pkg = require(`./package.json`);

const DEV = process.argv.includes('--dev');

const SRC = 'src/svate.js';

const svelte = sveltePlugin({
  compileOptions:{
    css: true
  }
});

// Build IIFE-module
!DEV && build({
  entryPoints: [SRC],
  outfile: pkg.cdn,
  format: 'iife',
  bundle: true,
  minify: true,
  sourcemap: true,
  plugins: [svelte],
  globalName: 'svate'
})

// Build ES-module
build({
  entryPoints: [SRC],
  outfile: pkg.module,
  format: 'esm',
  bundle: true,
  minify: !DEV,
  sourcemap: true,
  incremental: DEV,
  external: [
    ...Object.keys(pkg.dependencies||{}),
    ...Object.keys(pkg.peerDependencies||{}),
  ]
}).then( bundle_module => {
    DEV && build({
        entryPoints: ['test/src/app.js'],
        outfile: 'test/public/bundle.js',
        format: 'iife',
        bundle: true,
        minify: true,
        sourcemap: 'inline',
        incremental: true,
        plugins: [svelte]
      }).then( bundle_app =>{
        derver({
            dir: 'test/public',
            watch:['test/public','test/src','src'],
            onwatch: async (lr,item)=>{
                if(item == 'src'){
                    lr.prevent();
                    await bundle_module.rebuild().catch(err => lr.error(err.message,'Module compile error'));
                    await bundle_app.rebuild().catch(err => lr.error(err.message,'Test app compile error'));
                }
                if(item == 'test/src'){
                    lr.prevent();
                    await bundle_app.rebuild().catch(err => lr.error(err.message,'Test app compile error'));
                }
            }
        })
      })
})