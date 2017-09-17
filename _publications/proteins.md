--- 
layout: publication
articletitle: Visualizing Validation of Protein Surface Classifiers
presented: "EuroVis 2014"
conf: eurovis

bibtextype: article
publication: Computer Graphics Forum
authors: 
- Alper Sarikaya
- Danielle Albers (Szafir)
- Julie C. Mitchell
- Michael Gleicher
volume: 33
number: 3
pagestart: 171
pageend: 180
doi: 10.1111/cgf.12373
datepublished: 2014-06-01

link_paperlink: visualizing-validation-of-protein-surface-classifiers.pdf
link_suppl:
link_labrepo: http://graphics.cs.wisc.edu/Papers/2014/SAMG14/
video_teaser: 
video_paper: 
website_project: http://graphics.cs.wisc.edu/Vis/PSCVis/
website_repo: 
talk_slides: eurovis14-vvpsc-slides.pptx
talk_video: http://vimeo.com/98439215

thumbnail: 
imgteaser:
figure1: psc-example.png
caption1: |
    Our visualization approach applied to the validation of a DNA-binding classifier. The overview window (left) displays the corpus
    rendered as quilted blocks, giving an idea of aggregate performance across the corpus. The detail window (right) shows
    the clustered classifications for PDB: 1PVR_A, highlighted in yellow in the overview window. These clusters are itemized
    (lower right), allowing for highlighting regions of interest and automatic navigation to view a selected region.
figure2: 
caption2: 

excerpt: Iteratively designed a visualization to summarize and present classifier results on many 3D molecular structures.

postdate: 2017-09-17 15:54:00 -0700
categories: vis design-study biovis
---

This work seeks to create a better visual understanding performance of machine learning models that operate over a corpus of proteins. These classifiers typically try to predict where certain ligands bind to help in protein characterization (determining the function of a protein). The visualization seeks to combine summary judgments of performance over the corpus with a detailed view that shows performance on the three-dimensional surface of the protein.

Understanding how the performance of a trained classifier varies over a labeled test data set (corpus) can be difficult. The typical strategy of using summary statistics (accuracy, recall, F1 score, etc.) to determine the performance of a classifier leaves out critical data needed for comprehensive analysis of the classifier output. Which proteins does the classifier not accurately classify? What trends of performance can be seen across the corpus? How does this relate to metadata of the proteins? (e.g. size) How does the classification performance manifest itself on the three-dimensional structure of the proteins in the corpus? Are there any spatial trends that impact classification performance? 

We have developed a visualization platform to view the results of protein structural classifiers to be able to see the performance over both the entire test corpus (200+ proteins) and the protein structure.


