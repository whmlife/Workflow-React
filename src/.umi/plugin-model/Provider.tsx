// @ts-nocheck
import React from 'react';
import initialState from '/Users/dfocus/Desktop/company/test-flow/src/.umi/plugin-initial-state/models/initialState';
import model0 from "/Users/dfocus/Desktop/company/test-flow/src/models/useAppModel";
import model1 from "/Users/dfocus/Desktop/company/test-flow/src/models/useLoginModel";
import model2 from "/Users/dfocus/Desktop/company/test-flow/src/models/useProLayoutModel";
// @ts-ignore
import Dispatcher from './helpers/dispatcher';
// @ts-ignore
import Executor from './helpers/executor';
// @ts-ignore
import { UmiContext } from './helpers/constant';

export const models = { '@@initialState': initialState, 'useAppModel': model0, 'useLoginModel': model1, 'useProLayoutModel': model2 };

export type Model<T extends keyof typeof models> = {
  [key in keyof typeof models]: ReturnType<typeof models[T]>;
};

export type Models<T extends keyof typeof models> = Model<T>[T]

const dispatcher = new Dispatcher!();
const Exe = Executor!;

export default ({ children }: { children: React.ReactNode }) => {

  return (
    <UmiContext.Provider value={dispatcher}>
      {
        Object.entries(models).map(pair => (
          <Exe key={pair[0]} namespace={pair[0]} hook={pair[1] as any} onUpdate={(val: any) => {
            const [ns] = pair as [keyof typeof models, any];
            dispatcher.data[ns] = val;
            dispatcher.update(ns);
          }} />
        ))
      }
      {children}
    </UmiContext.Provider>
  )
}
