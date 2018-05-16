--- 
layout: publication
articletitle: "Design Factors for Summary Visualization in Visual Analytics"
presented: EuroVis 2018
conf: eurovis

bibtextype: article
publication: Computer Graphics Forum
authors: 
- Alper Sarikaya
- Michael Gleicher
- Danielle Albers Szafir
volume: 37
number: 3
pagestart: 
pageend: 
doi: 
datepublished: 2018-06-01

link_paperlink: summaries-preprint.pdf
link_suppl: summaries-suppl.zip
link_labrepo: http://graphics.cs.wisc.edu/Papers/2018/SGA18/
video_teaser: 
video_paper: 
website_project: http://graphics.cs.wisc.edu/Vis/vis_summaries/
website_repo: https://github.com/uwgraphics/VisualSummaries-Survey/
talk_slides: 
talk_video: 

thumbnail: summaries.png
imgteaser: 
figure1: teaser.png
caption1: |
    A schematic of a generalized process for visual analytics with data summarization. A dataset (left) is reduced using data summarization
    techniques (center), comprised of four basic methods (aggregate, project, subsample, filter), and is presented visually to support
    judgments of high-level data characteristics (right). Both the summarization and visual presentation are factors that influence the efficacy of
    summary visualization to enable viewers to make high-level judgments.
figure2: 
caption2: 

excerpt: Categorized different types of summaries used in visualization to identify how those decisions affect their use.

postdate: 2018-04-13 16:00:00 -0700
categories: vis survey taxonomy summary-visualization
---

Visual analytics, by its nature, helps users navigate large and complex datasets.  This data can often be too large, containing many dimensions or data items, necessitating some type of summary visualization.  We define summarization methods in broad terms, collecting techniques into four general methods: *aggregation*, *projection*, *subsampling*, and *filtering*.

In this paper, we take a guided approach to surveying the state of visualization, concentrating on how different choices in summarization methods can affect how the summaries are used in practice.  Breaking a little from standard visualization surveys, we use *existing* visualization taxonomies to help define a codebook for categorizing existing visual analytic systems.  Using the quantitative content analysis methodology (QCA), we identify correlations between the type of **summarization** employed, the **purpose** of the visualization, the viewer **tasks** supported by the visualization, and the **data type**.  

The result of this process is a set of 16 themes, which collectively define a series of challenges in designing summary visualizations, and suggestions for ensuring the efficacy of new designs.

*Work to be presented at [EuroVis 2018](http://eurovis.org/) in Brno, Czech Republic.*
