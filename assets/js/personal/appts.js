
const formatTime = d3.timeParse("%m/%d/%Y");

// with thanks to <https://observablehq.com/@d3/calendar>
function calendar(data) {
    window.data = data;
    const cellSize = 15;
    const weekDays = 5;
    const height = cellSize * (weekDays + 2);
    const width = 900;

    const allDates = d3.timeDay.range(new Date(2021,5,1), new Date(2022,11,31)).map(d => ({ date: d }));
    const dataByDay = d3.group(data, d => d.date);
    for (const [day, dayData] of dataByDay) {
        const curDate = allDates.find(d => +d.date === +day);
        curDate.data = dayData;
    }

    const formatMonth = d3.utcFormat("%b");
    const timeWeek = d3.utcMonday;
    const formatDay = i => "SMTWTFS"[i];
    const countDay = i => (i + 6) % 7;

    const x = d3.map(allDates, d => d.date);
    const y = d3.map(allDates, d => d.data);
    const ind = d3.range(x.length)

    const titles = d3.map(allDates, d => {
        if (d.data == null) return;
        let name = d3.timeFormat("%B %_d, %Y")(d.date);

        for (const datum of (d.data || [])) {
            name += `\n${datum.type}${datum.outcome ? `: ${datum.outcome.toLowerCase()}` : ''} (${datum.doc} at ${datum.provider})`;
        }
        return name;
    });
    const title = i => titles[i];

    // #5F4690,#1D6996,#38A6A5,#0F8554,#73AF48,#EDAD08,#E17C05,#CC503E,#94346E,#6F4070,#994E95,#666666
    const typeCategoryMap = {
        '(none)': 'lightgray',
        'Multiple': 'black',
        'Consult': '#0F8554',
        'Pre/postop': '#EDAD08',
        'Imaging': '#5F4690',
        'Surgery': '#E17C05',
        'Radiation': '#94346E',
    }
    const color = i => {
        const d = y[i];
        if (d == null) return 'lightgray';
        if (d.length > 1) return 'black';

        switch(d[0].type) {
            case 'Consult':
            case 'Surgery consult':
            case 'COVID test':
                return '#0F8554';
            case 'Preop':
            case 'Postop':
                return '#EDAD08';
            case 'Ultrasound':
            case 'X-ray':
            case 'CT':
            case 'MRI':
            case 'Bone scan':
                return '#5F4690';
            case 'Surgery (arthroscopic)':
            case 'Surgery (mascetomy)':
            case 'D&E':
            case 'Colonoscopy':
            case 'Biopsy':
            case 'Urgent care':
                return '#E17C05';
            case 'Radiation':
                return '#94346E';
            default:
                return 'white';
        }
    }

    const years = d3.groups(ind, i => x[i].getUTCFullYear());

    function pathMonth(t) {
        const d = countDay(t.getUTCDay());
        const w = d3.utcMonday.count(d3.utcYear(t), t);
        return `${d === 0 ? `M${w * cellSize},0`
            : d === weekDays ? `M${(w + 1) * cellSize},0`
            : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`}V${weekDays * cellSize}`;
    }

    const svg = d3.select('#svg')
        .attr('width', width)
        .attr('height', height * years.length)
        .attr('viewBox', [0, 0, width, height * years.length])
        .attr('style', `height: auto; position: absolute; left: 0; right: ${width}`)
        .attr('font-size', 10);

    const year = svg.selectAll('g')
        .data(years)
        .join('g')
            .attr('transform', (_d, i) => `translate(40.5,${height * i + cellSize * 1.5})`);

    year.append('text')
        .attr('x', -5)
        .attr('y', -5)
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'end')
        .text(([key]) => key);

    year.append('g')
        .attr('text-anchor', 'end')
        .selectAll('text')
        .data(d3.range(1, 6))
        .join('text')
            .attr('x', -5)
            .attr('y', i => (countDay(i) + 0.5) * cellSize)
            .attr('dy', '0.31em')
            .text(formatDay);

    year.append('g')
        .selectAll('rect')
        .data(([,ind]) => ind.filter(i => ![0,6].includes(x[i].getUTCDay())))
        .join('rect')
            .attr('width', cellSize - 1)
            .attr('height', cellSize - 1)
            .attr('x', i => timeWeek.count(d3.utcYear(x[i]), x[i]) * cellSize + 0.5)
            .attr('y', i => countDay(x[i].getUTCDay()) * cellSize + 0.5)
            .attr('fill', color)
            .append('title')
                .text(title);

    const month = year.append('g')
        .selectAll('g')
        .data(([,ind]) => d3.utcMonths(d3.utcMonth(x[ind[0]]), x[ind[ind.length - 1]]))
        .join('g');

    month.filter((_d, i) => i).append('path')
        .attr('fill', 'none')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)
        .attr('d', pathMonth);

    month.append('text')
        .attr('x', d => timeWeek.count(d3.utcYear(d), timeWeek.ceil(d)) * cellSize + 2)
        .attr('y', -5)
        .text(formatMonth);
}

d3.csv(
    "/assets/js/personal/appts.csv",
    d => ({
        date: formatTime(d.Date),
        type: d.Appointment,
        virtual: d.Virtual === "Yes",
        outcome: d.Outcome,
        provider: d.Provider,
        doc: d.Type,
    })
).then(calendar);