--- 
layout: publication
articletitle: "Using WebGL as an Interactive Visualization Medium: Our Experience Developing SplatterJs"
presented: "IEEE VIS 2015"
conf: infovis

bibtextype: proceedings
publication: "1st Workshop on Data Systems for Interactive Analysis"
authors: 
- Alper Sarikaya
- Michael Gleicher
volume: 
number: 
pagestart: 
pageend: 
doi: 
datepublished: 2015-10-26

link_paperlink: sarikaya.pdf
link_suppl: 
link_labrepo: http://graphics.cs.wisc.edu/Papers/2015/SG15/
video_teaser: 
video_paper: 
website_project: http://graphics.cs.wisc.edu/Projects/SplatterJs/
website_repo: https://github.com/uwgraphics/splatterjs
talk_slides: 15-DSIA-SplatterJs-talk.pdf
talk_video:

thumbnail: 
imgteaser: 
figure1: splatter-example.png
caption1: |
    A single year (2011) of FARS (Fatality Analysis Reporting System) data shown in SplatterJs.  The dataset comprises nearly 31,000
    points. The viewer is free to zoom and pan about the dataset, much like in typical web-mapping applications.  The use of WebGL makes
    this type of visualization extremely responsive with large amounts of data.
figure2: 
caption2: 

excerpt: WebGL is used to port the Splatterplot implementation to scale to large amounts of data on the web.

postdate: 2017-09-17 15:21:00 -0700
categories: vis scatterplots implementation
---

This work was presented at [the 1st Workshop on Data Systems for Interactive Analysis](http://www.interactive-analysis.org/year/2015/) at IEEE VIS in 2015.

Implementing the [Splatterplot paradigm](http://graphics.cs.wisc.edu/Papers/2013/MG13/) for WebGL to allow for arbitrary data to be loaded into a widely-accessible prototype. A splatterplot offers higher-level judgments of data over a conventional scatterplot by trying to minimize overdraw by communicating dense regions by closed regions and KDE blurring, while also preserving potentially interesting features such as outliers. This methodology scales well in the browser for modern GPUs, and can support comparisons between multiple data series.

Our preliminary publication submitted to the DSIA workshop discusses the potential benefits of utilizing WebGL and HTML5 binary scaffolds for supporting interactive visualizations and summarizations of large amounts of data in the browser.