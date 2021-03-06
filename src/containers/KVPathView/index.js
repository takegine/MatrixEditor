import React from 'react'; import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import styles from './index.scss';

import KVTextInput from '../../containers/KVTextInput';
import KVMultipleInput from '../../containers/KVMultipleInput';
import KVSelectInput from '../../containers/KVSelectInput';
import KVBoolInput from '../../containers/KVBoolInput';
import { withLang } from '../Lang';

import { TYPE_TEXT, TYPE_MULTI, TYPE_SINGLE, TYPE_BOOL } from '../../models/Base';

function getInputComponent(type) {
	switch (type) {
		case TYPE_MULTI:
			return KVMultipleInput;
		case TYPE_SINGLE:
			return KVSelectInput;
		case TYPE_BOOL:
			return KVBoolInput;
		case TYPE_TEXT:
		default:
			return KVTextInput;
	}
}

class KVPathView extends React.Component {
	constructor() {
		super();
		this.onKVChange = this.onKVChange.bind(this);
	}

	onKVChange(path, value) {
		const { onKVChange } = this.props;
		if (onKVChange) onKVChange(path, value);
	}

	render() {
		const { kv, lang, attrs } = this.props;

		return (
			<table className="table table-bordered" styleName="pathView">
				<tbody>
					<tr className="grid">
						<th width="100" />
						<td />
					</tr>
					{attrs.map((attr, index) => {
						const Input = getInputComponent(attr.type);
						const path = attr.path || [attr.name];
						const showFunc = attr.showFunc;

						if (showFunc && !showFunc(kv)) {
							return null;
						}

						return (
							<tr key={index} styleName={attr.divider ? 'divider' : ''}>
								<th className="text-no-break" styleName="keyField">
									{lang(attr.name) || attr.name}
									<span styleName="tips">{attr.name}</span>
								</th>
								<td styleName="valueField">
									<Input
										kv={kv} path={path} options={attr.options} abbrFunc={attr.abbrFunc}
										onKVChange={this.onKVChange}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}

KVPathView.propTypes = {
	lang: PropTypes.func,
	onKVChange: PropTypes.func,
	kv: PropTypes.object,
	attrs: PropTypes.array,
};

export default withLang(cssModules(KVPathView, styles));
