/**
 * External dependencies
 */
import GeneralSettings from './Sidebar/GeneralSettings.js';
import HorizontalAxisSettings from './Sidebar/HorizontalAxisSettings.js';
import VerticalAxisSettings from './Sidebar/VerticalAxisSettings.js';
import PieSettings from './Sidebar/PieSettings.js';
import ResidueSettings from './Sidebar/ResidueSettings.js';
import LinesSettings from './Sidebar/LinesSettings.js';
import BarsSettings from './Sidebar/BarsSettings.js';
import CandlesSettings from './Sidebar/CandlesSettings.js';
import MapSettings from './Sidebar/MapSettings.js';
import ColorAxis from './Sidebar/ColorAxis.js';
import SizeAxis from './Sidebar/SizeAxis.js';
import MagnifyingGlass from './Sidebar/MagnifyingGlass.js';
import GaugeSettings from './Sidebar/GaugeSettings.js';
import TimelineSettings from './Sidebar/TimelineSettings.js';
import TableSettings from './Sidebar/TableSettings.js';
import RowCellSettings from './Sidebar/RowCellSettings.js';
import ComboSettings from './Sidebar/ComboSettings.js';
import SeriesSettings from './Sidebar/SeriesSettings.js';
import SlicesSettings from './Sidebar/SlicesSettings.js';
import ColumnSettings from './Sidebar/ColumnSettings.js';
import LayoutAndChartArea from './Sidebar/LayoutAndChartArea.js';
import FrontendActions from './Sidebar/FrontendActions.js';
import ManualConfiguration from './Sidebar/ManualConfiguration.js';

import SlicesSettingsChartJS from './Sidebar/ChartJS/SlicesSettings.js';
import HorizontalAxisSettingsChartJS from './Sidebar/ChartJS/HorizontalAxisSettings.js';
import VerticalAxisSettingsChartJS from './Sidebar/ChartJS/VerticalAxisSettings.js';
import SeriesSettingsChartJS from './Sidebar/ChartJS/SeriesSettings.js';
import BarsSettingsChartJS from './Sidebar/ChartJS/BarsSettings.js';

/**
 * WordPress dependencies
 */
const {
	Component,
	Fragment
} = wp.element;

class Sidebar extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {

		const type = this.props.chart['visualizer-chart-type'];
        const lib = this.props.chart['visualizer-chart-library'];

		return (
			<Fragment>

				<GeneralSettings chart={ this.props.chart } edit={ this.props.edit } />

				{ ( -1 >= [ 'table', 'gauge', 'geo', 'pie', 'timeline', 'dataTable' ].indexOf( type ) ) && ( -1 >= [ 'ChartJS' ].indexOf( lib ) ) && (
					<HorizontalAxisSettings chart={ this.props.chart } edit={ this.props.edit } />
				) }

				{ ( -1 >= [ 'table', 'gauge', 'geo', 'pie', 'timeline', 'dataTable' ].indexOf( type ) ) && ( 0 <= [ 'ChartJS' ].indexOf( lib ) ) && (
					<HorizontalAxisSettingsChartJS chart={ this.props.chart } edit={ this.props.edit } />
				) }

				{ ( -1 >= [ 'table', 'gauge', 'geo', 'pie', 'timeline', 'dataTable' ].indexOf( type ) ) && ( -1 >= [ 'ChartJS' ].indexOf( lib ) ) && (
					<VerticalAxisSettings chart={ this.props.chart } edit={ this.props.edit } />
				) }

				{ ( -1 >= [ 'table', 'gauge', 'geo', 'pie', 'timeline', 'dataTable' ].indexOf( type ) ) && ( 0 <= [ 'ChartJS' ].indexOf( lib ) ) && (
					<VerticalAxisSettingsChartJS chart={ this.props.chart } edit={ this.props.edit } />
				) }


				{ ( 0 <= [ 'pie' ].indexOf( type ) ) && ( -1 >= [ 'ChartJS' ].indexOf( lib ) ) && (
					<Fragment>

						<PieSettings chart={ this.props.chart } edit={ this.props.edit } />

						<ResidueSettings chart={ this.props.chart } edit={ this.props.edit } />

					</Fragment>
				) }

				{ ( 0 <= [ 'area', 'scatter', 'line' ].indexOf( type ) ) && ( -1 >= [ 'ChartJS' ].indexOf( lib ) ) && (
					<LinesSettings chart={ this.props.chart } edit={ this.props.edit } />
				) }

				{ ( 0 <= [ 'bar', 'column' ].indexOf( type ) ) && ( -1 >= [ 'ChartJS' ].indexOf( lib ) ) && (
					<BarsSettings chart={ this.props.chart } edit={ this.props.edit } />
				) }

				{ ( 0 <= [ 'bar', 'column' ].indexOf( type ) ) && ( 0 <= [ 'ChartJS' ].indexOf( lib ) ) && (
					<BarsSettingsChartJS chart={ this.props.chart } edit={ this.props.edit } />
				) }


				{ ( 0 <= [ 'candlestick' ].indexOf( type ) ) && (
					<CandlesSettings chart={ this.props.chart } edit={ this.props.edit } />
				) }

				{ ( 0 <= [ 'geo' ].indexOf( type ) ) && (
					<Fragment>

						<MapSettings chart={ this.props.chart } edit={ this.props.edit } />

						<ColorAxis chart={ this.props.chart } edit={ this.props.edit } />

						<SizeAxis chart={ this.props.chart } edit={ this.props.edit } />

						<MagnifyingGlass chart={ this.props.chart } edit={ this.props.edit } />

					</Fragment>
				) }

				{ ( 0 <= [ 'gauge' ].indexOf( type ) ) && (
					<GaugeSettings chart={ this.props.chart } edit={ this.props.edit } />
				) }

				{ ( 0 <= [ 'timeline' ].indexOf( type ) ) && (
					<TimelineSettings chart={ this.props.chart } edit={ this.props.edit } />
				) }

				{ ( 0 <= [ 'table', 'dataTable' ].indexOf( type ) ) && (
					<Fragment>

						<TableSettings chart={ this.props.chart } edit={ this.props.edit } />

						<RowCellSettings chart={ this.props.chart } edit={ this.props.edit } />

					</Fragment>
				) }

				{ ( 0 <= [ 'combo' ].indexOf( type ) ) && (
					<ComboSettings chart={ this.props.chart } edit={ this.props.edit } />
				) }

				{ ( -1 >= [ 'timeline', 'gauge', 'geo', 'pie', 'dataTable' ].indexOf( type ) ) && ( -1 >= [ 'ChartJS' ].indexOf( lib ) ) && (
					<SeriesSettings chart={ this.props.chart } edit={ this.props.edit } />
				) }

				{ ( -1 >= [ 'timeline', 'gauge', 'geo', 'pie', 'dataTable' ].indexOf( type ) ) && ( 0 <= [ 'ChartJS' ].indexOf( lib ) ) && (
					<SeriesSettingsChartJS chart={ this.props.chart } edit={ this.props.edit } />
				) }

				{ ( 0 <= [ 'pie' ].indexOf( type ) ) && ( -1 >= [ 'ChartJS' ].indexOf( lib ) ) && (
					<SlicesSettings chart={ this.props.chart } edit={ this.props.edit } />
				) }

				{ ( 0 <= [ 'pie' ].indexOf( type ) ) && ( 0 <= [ 'ChartJS' ].indexOf( lib ) ) && (
					<SlicesSettingsChartJS chart={ this.props.chart } edit={ this.props.edit } />
				) }


				{ ( 0 <= [ 'dataTable' ].indexOf( type ) ) && (
					<ColumnSettings chart={ this.props.chart } edit={ this.props.edit } />
				) }

				{ ( -1 >= [ 'dataTable' ].indexOf( type ) ) && (
					<LayoutAndChartArea chart={ this.props.chart } edit={ this.props.edit } />
				) }

				<FrontendActions chart={ this.props.chart } edit={ this.props.edit } />

				{ ( -1 >= [ 'dataTable' ].indexOf( type ) ) && (
					<ManualConfiguration chart={ this.props.chart } edit={ this.props.edit } />
				) }
			</Fragment>
		);
	}
}

export default Sidebar;
