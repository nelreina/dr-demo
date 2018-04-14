import { assign, reduce, groupBy } from 'lodash';
import S from 'string';
import { createSelector } from 'reselect';

const rightAlign = { textAlign: 'right' };
const centerAlign = { textAlign: 'center' };
const nowrap = { whiteSpace: 'nowrap' };
const header = assign({}, nowrap, centerAlign);
const zoom = { zoom: '70%' };
const link = { color: '#0065FF', cursor: 'pointer' };

export const style = { rightAlign, nowrap, header, zoom, link };
export const amountFormat = {
  symbol: '',
  precision: 2,
  thousand: ',',
  format: {
    pos: '%s %v',
    neg: '%s (%v)',
    zero: '%s  -'
  }
};
export const getColsArray = report => {
  const cols = [];
  for (let i = 1; i <= report.countAmountColumns; i++) {
    cols.push('Col' + i);
  }
  cols.push('Total');
  return cols;
};

export const getReportName = (report, activePeriod, t) => {
  let reportName = '';
  if (report) {
    reportName += report.schedule === 'Y' ? `${report.code} - ` : '';
    reportName += t(report.name);
  }
  if (reportName) {
    if (typeof String) {
      reportName = S(reportName).truncate(35).s;
      reportName += activePeriod ? ' - ' + activePeriod.name : '';
    }
  }
  return reportName;
};

export const calcSumDetails = data =>
  reduce(data, (sum, key) => sum + key.Amount, 0);

const detials = state => state.ncoaDetails.data;
const reports = state => state.reports.data;
const filterDetails = state => state.form.filterDetails;

const showDashboard = reports => {
  const list = Object.keys(reports).map(k => reports[k]);
  return list.filter(rep => rep.dashboard === 1);
};

const tabNav = reports => {
  const list = Object.keys(reports).map(k => reports[k]);
  const group = groupBy(list, 'group');
  return Object.keys(group).map(grp => ({
    name: grp,
    url: `/reportlist/tab/${grp.toLowerCase()}`
  }));
};
const reportGroup = reports => {
  const list = Object.keys(reports).map(k => reports[k]);
  return groupBy(list, 'group');
};
const execFilter = (details, filterDetails) => {
  if (filterDetails && filterDetails.values) {
    const { values: { filter } } = filterDetails;
    return details.filter(
      item =>
        item.E0015.toLowerCase().contains(filter.toLowerCase()) ||
        item.R0000.contains(filter)
    );
  } else {
    return details;
  }
};
export const filterSelector = createSelector(
  detials,
  filterDetails,
  execFilter
);
export const dashboardSelector = createSelector(reports, showDashboard);
export const tabNavSelector = createSelector(reports, tabNav);
export const reportGroupSelector = createSelector(reports, reportGroup);
