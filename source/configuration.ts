/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import isEqual from "lodash-es/isEqual";

export interface Configuration {
    assert?: (value: any, message: string) => void;
    assertDeepEqual?: (a: any, b: any) => void;
}

let configuration: Configuration = {
    assert: defaultAssert,
    assertDeepEqual: defaultAssertDeepEqual
};

export function configure(options: Configuration): void {

    configuration = { ...options };
}

export function get<K extends keyof Configuration>(key: K): Configuration[K] {

    return configuration[key];
}

function defaultAssert(value: any, message: string): void {

    if (value) {
        return;
    }
    throw new Error(message);
}

function defaultAssertDeepEqual(a: any, b: any): void {

    if (isEqual(a, b)) {
        return;
    }
    throw new Error(`Expected ${toString(a)} to equal ${toString(b)}.`);
}

function toString(value: any): string {

    if (value === null) {
        return "null";
    } else if (value === undefined) {
        return "undefined";
    }
    return value.toString();
}