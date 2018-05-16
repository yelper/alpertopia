--- 
layout: publication
articletitle: Visualizing Co-occurrence of Events in Populations of Viral Genome Sequences
presented: "EuroVis 2016"
conf: eurovis

bibtextype: article
publication: Computer Graphics Forum
authors: 
- Alper Sarikaya
- Michael Correll
- Jorge M. Dinis
- David H. O'Connor
- Michael Gleicher
volume: 35
number: 3
pagestart: 151
pageend: 160
doi: 10.1111/cgf.12891
datepublished: 2016-06-01

link_paperlink: co-occurrence-eurovis2016.pdf
link_suppl:
link_labrepo: http://graphics.cs.wisc.edu/Papers/2016/SCDOG16/
video_teaser: 
video_paper: CooccurViewer-video.mp4
website_project: http://graphics.cs.wisc.edu/Vis/CooccurViewer/
website_repo: https://github.com/uwgraphics/CooccurViewer
talk_slides: eurovis16-cooccur-slides.pdf
talk_video:

thumbnail: thumbnail.png
imgteaser:
figure1: fullproto.png
caption1: An overall view of SIV loaded into [*CooccurViewer*](http://graphics.cs.wisc.edu/Vis/CooccurViewer/).  Annotations (a) denote regions of the genome that have some biological context, and the overview (b) denotes positions of significant co-occurrence, summarizing three user-controlled metrics using color. The correlation diagrams (c) provide a representation of correlation between pairs of positions, and some details (d) about metric values.  The current position's summary of correlations (e) is given on the left, with small-multiple representations.  The sliders (f) control the thresholds for the interest metrics and filters the co-occurrences shown in the visualization.
figure2: 
caption2: 

excerpt: Iteratively designed an visualization to help rapidly identify co-occurrences of base-pair mutations in populations of viral genomes.

postdate: 2017-09-09 20:08:00 -0700
categories: vis design-study biovis
---

Our exploration of the co-occurrences of mutations in populations of viral genomes led us to propose several designs for the rapid identification of these co-occurrences. Identifying these co-occurrences is critical step to target potential therapies for fast-mutating viruses, especially those in the class of RNA viruses. Co-occurrences of mutations can indicate that the virus is successfully adapting to outside pressures, such as the host's immune system. 

We present a design study that looks at the problem of identifying potentially interesting co-occurrences of events (in this case, mutations), and show both a negative example (MatrixViewer) and a positive example ([CooccurViewer](http://graphics.cs.wisc.edu/Vis/CooccurViewer/)) that helps analysts identify interesting co-occurrences.

*This work was presented at [EuroVis 2016](http://www.cs.rug.nl/jbi/eurovis2016/) in Groningen, Netherlands.*
