// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;

const {
	RichText,
	withFontSizes,
	withColors,
} = wp.editor;

class Edit extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
			attributes: {
				price,
				currency,
				term,
				showTerm,
			},
			isSelected,
			className,
			setAttributes,
			fallbackFontSize,
			fontSize,
			backgroundColor,
			textColor,
		} = this.props;

		// Setup wrapper class names
		const editClassWrapperName = classnames( {
			'ab-pricing-table-price-wrap': true,
			'has-text-color': textColor.color,
			'has-background': backgroundColor.color,
			[ backgroundColor.class ]: backgroundColor.class,
			[ textColor.class ]: textColor.class,
		} );

		// Setup price class names
		const editClassName = classnames( {
			'ab-pricing-table-price': true,
			[ fontSize.class ]: fontSize.class,
		} );

		// Setup wrapper styles
		const editWrapStyles = {
			backgroundColor: backgroundColor.color,
			color: textColor.color,
		};

		// Setup price styles
		const editStyles = {
			fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
		};

		// Setup currency styles
		var currencySize = Math.floor(fontSize.size / 2.5);
		const currencyStyles = {
			fontSize: fontSize.size ? currencySize + 'px' : undefined,
		};

		return [
			<Fragment>
				<Inspector
					{ ...this.props }
				/>
				<div
					className={ editClassWrapperName ? editClassWrapperName : undefined }
					style={ editWrapStyles }
				>
					<div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
						<RichText
							tagName="span"
							itemprop="priceCurrency"
							placeholder={ __( '$', 'atomic-blocks' ) }
							keepPlaceholderOnFocus
							value={ currency }
							onChange={ ( value ) => setAttributes( { currency: value } ) }
							className="ab-pricing-table-currency"
							style={ currencyStyles }
						/>
						<RichText
							tagName="div"
							itemprop="price"
							placeholder={ __( '49', 'atomic-blocks' ) }
							keepPlaceholderOnFocus
							value={ price }
							onChange={ ( value ) => setAttributes( { price: value } ) }
							style={ editStyles }
							className={ editClassName ? editClassName : undefined }
						/>
						{ showTerm && (
							<RichText
								tagName="span"
								value={ term }
								placeholder={ __( '/mo', 'atomic-blocks' ) }
								keepPlaceholderOnFocus
								onChange={ ( value ) => setAttributes( { term: value } ) }
								className="ab-pricing-table-term"
							/>
						) }
					</div>
				</div>
			</Fragment>
		];
	}
}

export default compose( [
	withFontSizes( 'fontSize' ),
	withColors( 'backgroundColor', { textColor: 'color' } ),
] )( Edit );