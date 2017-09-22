--- 
layout: publication
articletitle: "Lightness Constancy in Surface Visualization"
presented: SciVis 2016
conf: scivis

bibtextype: article
publication: IEEE Transactions on Visualization and Computer Graphics
authors: 
- Danielle Albers Szafir
- Alper Sarikaya
- Michael Gleicher
volume: 22
number: 9
pagestart: 2107
pageend: 2121
doi:  10.1109/TVCG.2015.2500240
datepublished: 2015-11-12

link_paperlink: constancy-preprint.pdf
link_suppl: 
link_labrepo: http://graphics.cs.wisc.edu/Papers/2016/ASG16/
video_teaser: 
video_paper: 
website_project: 
website_repo: 
talk_slides: 16-VIS-Constancy.pdf
talk_video:

thumbnail: thumbnail.png
imgteaser: 
figure1: example.png
caption1: |
    Our findings, exemplified by hydrophobicity data in the shadowed regions above, show that visualization design significantly 
    impacts viewers’ abilities to read data encoded on a surface. (a, b) Ambient occlusion surfaces support viewers in reading shadowed
    data, which is improved by (c) directional shading. 
figure2: 
caption2: 

excerpt: Identified and empirically tested the effects of rendering decisions on the recovery of color information from 3D surfaces.

postdate: 2017-09-17 14:25:00 -0700
categories: vis design-study scatterplots
---

This project led us to ask and run empirical studies to see how perception of lightness constancy comes into play when displaying data using color on surfaces (such as [molecular surfaces]({{ site.baseurl }}{% link _publications/proteins.md %})) that use shading to convey a sense of three-dimensional shape. 

Our work uses a sequential series of experiments to test the presence of lightness constancy, the effect of structural information, approximation of shadow darkening, the effect of luminance-encoded color ramps, and addition of optional shape cues (stereoscopic and suggestive contours). We provide a series of conclusions about supporting color constancy to ensure viewers obtain accurate judgments of shadowed data in computer-generated visualizations.

An [early version of this work](../assets/publications/constancy/template.pdf) won SciVis best poster at IEEE Vis 2013.  This paper was presented by Danielle Szafir as an out-of-band TVCG paper at SciVis 2016.