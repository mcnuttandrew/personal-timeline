const curretDate = new Date();
export default {
  occupationData: [{
      job: 'YOUTH',
      start: '1991-09-27',
      end: '2010-08-23'
    }, {job: 'REED',
      start: '2010-08-23',
      end: '2014-05-23',
      img: 'https://raw.githubusercontent.com/mcnuttandrew/personal-timeline/master/assets/reed.png'
    }, {
      unseenName: 'A/a',
      job: '',
      start: '2014-08-02',
      end: '2014-10-15',
      img: 'https://raw.githubusercontent.com/mcnuttandrew/personal-timeline/master/assets/app-academy.png'
    }, {
      unseenName: 'CDD',
      job: '',
      start: '2014-10-15',
      end: '2015-10-23',
      img: 'https://raw.githubusercontent.com/mcnuttandrew/personal-timeline/master/assets/cdd.jpg'
    }, {
      unseenName: 'UBER',
      job: '',
      start: '2015-10-23',
      end: '2017-04-14',
      img: 'https://raw.githubusercontent.com/mcnuttandrew/personal-timeline/master/assets/uber.jpg'
    }, {
      unseenName: 'UCHICAGO',
      job: '',
      start: '2017-09-01',
      end: curretDate,
      img: 'https://raw.githubusercontent.com/mcnuttandrew/personal-timeline/master/assets/uchicago.png'
    }
  ],

  locationData: [
    {place: 'WASHINGTON', start: '1991-09-27', end: '2010-08-23', color: '#7ED321'},
    {place: 'OREGON', start: '2010-08-23', end: '2014-07-28', color: '#F5A623'},
    {place: 'CALIFORNIA', start: '2014-07-28', end: '2017-06-01', color: '#4A90E2'},
    {place: 'ILLINOIS', start: '2017-09-01', end: curretDate, color: '#EEE9BF'}
  ],

  relationshipData: [
    {start: '2006-03-10', end: '2007-11-10', offset: 0},
    {start: '2009-10-23', end: '2010-08-02', offset: 0},
    {start: '2011-02-01', end: '2012-11-01', offset: 0},
    {start: '2012-05-27', end: '2012-11-01', offset: 1},
    {start: '2013-03-08', end: '2017-06-23', offset: 0},
  ],

  eventsData: [
    {text: 'Born', time: '1991-09-27', height: 7},
    {text: 'Broke my arm', time: '1994-09-22', height: 5},
    {text: 'Caught a fish', time: '1997-08-10', height: 8},
    {text: 'Learned to read by playing pokemon', time: '1999-09-10', height: 4.5},
    // {text: 'Saw my first concert (modest mouse)', time: '1999-09-02', height: 8},
    {text: 'Learned to program a TI83', time: '2005-09-030', height: 7.5},
    {text: 'Quit trying to be good at chess', time: '2005-04-10', height: 10},
    {text: 'Found a pair \n of sunglasses in rural China', time: '2007-04-22', height: 5.5},
    {text: 'Realized math was important to me after all', time: '2009-10-02', height: 10},
    {text: 'Went to the desert for the first time', time: '2012-01-08', height: 8},
    {text: 'Patted a buffalo on the head', time: '2014-07-23', height: 4.5}
  ],

  numbersData: [
    {value: '11', title: 'places lived'},
    {value: '30?', title: 'states visted'},
    {value: '7', title: 'countries visted'},
    {value: '8', title: 'jobs held'},
    {value: '74', title: 'inches grown'}
  ]
};
