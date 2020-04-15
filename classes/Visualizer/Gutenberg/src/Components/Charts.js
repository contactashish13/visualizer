/**
 * This file renders the chart grid for selection.
 */

 /* eslint-disable operator-linebreak */

import { Chart } from 'react-google-charts';

import DataTable from './DataTable.js';
import ChartJS from './ChartJS.js';

import { formatDate, filterCharts } from '../utils.js';

/**
 * WordPress dependencies
 */
const { startCase } = lodash;

const { __ } = wp.i18n;

const { apiFetch } = wp;

const {
	Component,
	Fragment
} = wp.element;

const {
	Button,
	Dashicon,
	ExternalLink,
	Notice,
	Placeholder,
	Spinner
} = wp.components;

class Charts extends Component {
	constructor() {
		super( ...arguments );

		this.loadMoreCharts = this.loadMoreCharts.bind( this );

		this.state = {
			charts: null,
			isBusy: false,
			chartsLoaded: false,
            perPage: visualizerLocalize.chartsPerPage
		};
	}

	async componentDidMount() {
        const perPage = visualizerLocalize.chartsPerPage;

		// Fetch review again if block loaded after saving.
		let result = await apiFetch({ path: 'wp/v2/visualizer/?per_page=' + perPage });
		this.setState({ charts: result });
	}

	async loadMoreCharts() {
		const offset = ( this.state.charts ).length;
		let chartsLoaded = this.state.chartsLoaded;
        const perPage = this.state.perPage;

		this.setState({ isBusy: true });

		let result = await apiFetch({ path: `wp/v2/visualizer/?per_page=${ perPage }&offset=${ offset }` });

		if ( perPage > result.length ) {
			chartsLoaded = true;
		}

		this.setState({
			charts: this.state.charts.concat( result ),
			isBusy: false,
			chartsLoaded
		});
	}

	render() {
		const { charts, isBusy, chartsLoaded, perPage } = this.state;

		return (
			<div className="visualizer-settings__charts">
				{
					( null !== charts ) ?
						( 1 <= charts.length ) ?
							<Fragment>

								<div className="visualizer-settings__charts-grid">

									{ ( Object.keys( charts ) ).map( i => {
										const data = formatDate( charts[i]['chart_data']);

										let title, chart, footer;

										if ( data['visualizer-settings'].title  ) {
                                            // chartjs titles are objects.
											title = 'object' === typeof data['visualizer-settings'].title ? data['visualizer-settings'].title.text : data['visualizer-settings'].title;
										} else {
											title = `#${charts[i].id}`;
										}

										if ( 0 <= [ 'gauge', 'table', 'timeline', 'dataTable' ].indexOf( data['visualizer-chart-type']) ) {
											if ( 'dataTable' === data['visualizer-chart-type']) {
												chart = data['visualizer-chart-type'];
											} else {
												chart = startCase( data['visualizer-chart-type']);
											}
										} else {
											chart = `${ startCase( data['visualizer-chart-type']) }Chart`;
										}

										if ( data['visualizer-data-exploded']) {
                                            footer = __( 'Annotations in this chart may not display here but they will display in the front end.' );
                                        }

										return (
											<div className="visualizer-settings__charts-single" key={ `chart-${ charts[i].id }` }>

												<div className="visualizer-settings__charts-title">
													{ title }
												</div>

												{ 'dataTable' === chart ? (
													<DataTable
														id={ charts[i].id }
														rows={ data['visualizer-data'] }
														columns={ data['visualizer-series'] }
														chartsScreen={ true }
														options={ filterCharts( data['visualizer-settings']) }
													/>
												) : ( 'ChartJS' === data['visualizer-chart-library'] ? (
                                                    <ChartJS
														chartType={ data['visualizer-chart-type'] }
														id={ charts[i].id }
														data={ data['visualizer-data'] }
														series={ data['visualizer-series'] }
														chartsScreen={ true }
														options={ filterCharts( data['visualizer-settings']) }
                                                    />
												) : ( '' !== data['visualizer-data-exploded'] ? (
													<Chart
														chartType={ chart }
														rows={ data['visualizer-data'] }
														columns={ data['visualizer-series'] }
														options={ filterCharts( data['visualizer-settings']) }
													/>
												) : (
													<Chart
														chartType={ chart }
														rows={ data['visualizer-data'] }
														columns={ data['visualizer-series'] }
														options={ filterCharts( data['visualizer-settings']) }
													/>
												) ) ) }

                                                 <div className="visualizer-settings__charts-footer"><sub>
                                                    { footer }
                                                 </sub></div>

												<div
													className="visualizer-settings__charts-controls"
													title={ __( 'Insert Chart' ) }
													onClick={ () => this.props.getChart( charts[i].id ) }
												>
													<Dashicon icon="upload"></Dashicon>
												</div>

											</div>
										);
									}) }
								</div>

								{ ! chartsLoaded && perPage - 1 < charts.length && (
									<Button
										isPrimary
										isLarge
										onClick={ this.loadMoreCharts }
										isBusy={ isBusy }
									>
										{ __( 'Load More' ) }
									</Button>
								) }

                                <div>
                                { isBusy ?
                                        <Spinner/>
                                         :
                                    <div/>
                                }
                                </div>

							</Fragment>
                        :
							<p className="visualizer-no-charts">
								{ __( 'No charts found.' ) }
							</p>
                    :
                        <Placeholder>
                            <Spinner/>
                        </Placeholder>
				}

			</div>
		);
	}
}

export default Charts;
