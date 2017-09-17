--- 
layout: publication
articletitle: "Scatterplots: Tasks, Data, and Designs"
presented: InfoVis 2017
conf: infovis

bibtextype: article
publication: IEEE Transactions on Visualization and Computer Graphics
authors: 
- Alper Sarikaya
- Michael Gleicher
volume: 28
number: 1
pagestart: 
pageend: 
doi: 10.1109/TVCG.2017.2744184
datepublished: 2018-01-01

link_paperlink: scatterplots-preprint.pdf
link_suppl: scatterplot-suppl.zip
link_labrepo: http://graphics.cs.wisc.edu/Papers/2018/SG18/
video_teaser: scatterplot-paper-ff.mp4
video_paper: 
website_project: http://graphics.cs.wisc.edu/Vis/scattertasks/
website_repo: https://github.com/uwgraphics/scattertasks/
talk_slides: 
talk_video:

thumbnail: 
imgteaser: scatterplot-header.png
figure1: scatterplot-teaser.png
caption1: |
    Scatterplot designs (shown in columns) have varying levels of support for viewer tasks based on the data characteristics (rows).
    Here, we compare a traditional scatterplot (left column) to a hexagonal binning implementation (middle) to a Splatterplot 
    (right) for three representative datasets. 
    
    For random distributions with few points (top row), the traditional scatterplot (left) describes the data plainly. With increasing numbers of points (middle row), aggregation
    representations such as binning (center) communicate spatial density.  With overlapping distributions (bottom row), density-based
    representations communicate overlap and can also show outliers (right), which disappear in the binned representation (middle).
figure2: 
caption2: 

excerpt: Identified factors (tasks and data characteristics) that lead to changes in design strategies for effective scatterplot design.

postdate: 2017-09-17 14:25:00 -0700
categories: vis design-study scatterplots
---

Scatterplots are among the most common methods for exploring and presenting data. We look at teasing apart the design decisions by focusing on the trade-offs of task affordances. In this work, we synthesize recent work to derive tweleve abstracted scatterplots that help to formulate a basis for prescriptive scatterplot design.

In the larger picture, we look at how we can take both task and data characteristics into account for prescriptive scatterplot design. This involves collecting the full set of scatterplot design decisions and their individual affordances. As a result of this work, we expect to identify areas of the scatterplot design space that are under-explored, and provide guidance for effective scatterplot design, given the required affordances and relevant characteristics of the data.  

To this end, we see this work as setting the foundation for future empirical work.  Now that we have the factors and have shown how they can be utilized to identify appropriate design decisions, we can move forward to quantify and describe how different design decisions can affect task performance, dependent on the characteristics of the data.  We envision that these determinations can be used to identify good starting designs, as well as used in visualization authoring programs for both practitioners and people new to visualization design.
