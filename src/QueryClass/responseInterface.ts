/*
 * This is the primary high-level API for the project. In this folder there should be:
 * A class called InsightFacade, this should be in a file called InsightFacade.ts.
 * You should not change this interface at all or the test suite will not work.
 */


export interface QueryRequest2 {
    // query:{};
    // you can define your own structure that complies with the EBNF here
    render: 'TABLE';

    result:any[];
}
