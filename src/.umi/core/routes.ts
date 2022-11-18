// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/dfocus/Desktop/company/test-flow/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__index' */'@/layouts/index.tsx')}),
    "routes": [
      {
        "path": "/dashboard/analysis",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__dashboard__analysis__index' */'@/pages/dashboard/analysis/index.tsx')}),
        "title": "ANALYSIS_TITLE",
        "layout": "PRO_LAYOUT",
        "access": "canReadDashboardAnalysis"
      },
      {
        "path": "/dashboard/monitor",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__dashboard__monitor__index' */'@/pages/dashboard/monitor/index.tsx')}),
        "title": "MONITOR_TITLE",
        "layout": "PRO_LAYOUT",
        "access": "canReadDashboardMonitor"
      },
      {
        "path": "/",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__index' */'@/pages/index.tsx')})
      },
      {
        "path": "/o/login",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__o__login__index' */'@/pages/o/login/index.tsx')})
      },
      {
        "path": "/test/fmrender",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__test__fmrender__index' */'@/pages/test/fmrender/index.tsx')})
      },
      {
        "path": "/test/frgenerator",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__test__frgenerator__index' */'@/pages/test/frgenerator/index.tsx')})
      },
      {
        "path": "/test/workFlow",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__test__workFlow__index' */'@/pages/test/workFlow/index.tsx')})
      },
      {
        "path": "/test/workFlow/util",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__test__workFlow__util' */'@/pages/test/workFlow/util.tsx')})
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
