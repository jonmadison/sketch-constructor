/*
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

const uuid = require('uuid-v4');
const Layer = require('../Layer');
const Rect = require('../Rect');
const Style = require('../Style');

/**
 * A group extends
 * @extends Layer
 *
 */
class Group extends Layer {
  /**
   *
   * @param {Object} args
   * @param {Object} args.frame Sent to {@link Rect}
   * @param {Object} args.style Sent to {@link Style}
   * @param {Layer[]} args.layers
   * @param {Group.Model} json
   */
  constructor(args = {}, json) {
    super(args, json);
    if (!json) {
      const id = args.id || uuid().toUpperCase();
      Object.assign(this, Group.Model, {
        do_objectID: id,
        name: args.name || id,
        frame: new Rect(args.frame),
        style: new Style(args.style),
        layers: args.layers || [],
      });
    }
    this = newIds(this);
    return this;
  }
}

/**
 * @mixes Layer.Model
 */
Group.Model = Object.assign({}, Layer.Model, {
  _class: 'group',
  layerListExpandedType: 2,
  resizingConstraint: 63,
  hasClickThrough: false,
});

let newIds = obj => {
  Object.keys(obj).forEach(key => {
    if (key === 'do_objectID') {
      obj[key] = uuidv1().toUpperCase();
      return obj;
    }
    if (typeof obj[key] === 'object') {
      newIds(obj[key]);
    }
  });
  return obj;
};

module.exports = Group;
