import should from 'should';
import EvtX, { Service } from '..';

const { describe, it } = global;

const sum = data => data.reduce((acc, v) => acc + v, 0);
const product = data => data.reduce((acc, v) => acc * v, 1);

const calculator = {
  name: 'calculator',
  sum({ input }) {
    return Promise.resolve({ result: sum(input) });
  },
  product({ input }) {
    return Promise.resolve({ result: product(input) });
  },
};

describe('EvtX', () => {
  it('should call right method',  (done) => {
    const evtx = EvtX().use(calculator.name, calculator);
    const message = { method: 'sum', service: calculator.name, input: [1, 2] };
    evtx
      .run(message)
      .then(res => { should(res.result).equal(3); done() })
      .catch(done);
  });

  it('should not call a method',  (done) => {
    const evtx = EvtX().use(calculator.name, calculator);
    const message = { };
    evtx
      .run(message)
      .then(res => done(new Error('Should be an error')))
      .catch(() => done());
  });

  it('should call service hooks',  (done) => {
    const incInput = (ctx) => {
      const { input } = ctx;
      return Promise.resolve({ ...ctx, input: input.map(x => x+1 ) });
    };

    const incResult = (ctx) => {
      const { output: { result } } = ctx;
      return Promise.resolve({ ...ctx, output: {result: result + 1 }});
    };

    const bhooks = {
      all: [incInput, incInput],
      sum: [incInput],
    };

    const ahooks = {
      all: [incResult, incResult],
      sum: [incResult],
    };

    const evtx = EvtX().use(calculator.name, calculator);
    evtx.service(calculator.name).before(bhooks).after(ahooks);

    const message = { method: 'sum', service: calculator.name, input: [1, 2] };
    evtx
      .run(message)
      .then(res => { should(res.result).equal(12); done() })
      .catch(done);
  });

  it('should call EvtX hooks',  (done) => {
    const incResult = (ctx) => {
      const { output: { result } } = ctx;
      return Promise.resolve({ ...ctx, output: { result: result + 1 }});
    };

    const changeMethod = (ctx) => {
      return Promise.resolve({ ...ctx, method: 'product' });
    };

    const evtx = EvtX()
      .use(calculator.name, calculator)
      .before(changeMethod)
      .after(incResult);
    evtx.service(calculator.name);

    const message = { method: 'sum', service: calculator.name, input: [3, 2] };
    evtx
      .run(message)
      .then(res => { should(res.result).equal(7); done() })
      .catch(done);
  });

});
