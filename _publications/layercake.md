--- 
layout: publication
articletitle: "LayerCake: A Tool for the Visual Comparison of Viral Deep Sequencing Data"
presented:
conf: 

bibtextype: article
publication: Bioinformatics
authors: 
- Michael Correll
- Adam Bailey
- Alper Sarikaya
- David H. O'Connor 
- Michael Gleicher 
volume: 31
number: 21
pagestart: 3522
pageend: 3528
doi: 10.1093/bioinformatics/btv407
datepublished: 2015-11-01

link_paperlink: 
link_suppl:
link_labrepo: http://graphics.cs.wisc.edu/Papers/2015/CBSOG15/
video_teaser: 
video_paper: 
website_project: http://graphics.cs.wisc.edu/WP/layercake/
website_repo: https://github.com/uwgraphics/layercake
talk_slides: 
talk_video: 

thumbnail: thumbnail.png
imgteaser:
figure1: overview.png
caption1: |
    The LayerCake tool is designed to allow viewers to quickly find areas of a viral genome where many different populations have variation with respect to a reference genome. There are two main components of the tool: rows, which represent distinct viral populations (in this case each row represents the viral population within each infected individual), and blocks, which represent a particular section of the genome. 
    
    Since the information for the entire genome cannot fit in standard displays, each block is usually composed of the information for multiple individual base pairs averaged together.  This is a much more information-compact way to communicate mutations than traditional sequence logos.
figure2: 
caption2: 

excerpt: Designed and implemented a visualization system to rapidly identify correlations of mutations between viral genome samples.

postdate: 2017-09-17 16:03:00 -0700
categories: vis design-study biovis
---

LayerCake is a tool created for visualizing viral variation from next generation sequencing data, created as a collaboration between labs associated with UW Computer Sciences and UW Pathology & Laboratory Medicine Departments.

LayerCake is meant to afford the quick analysis of variation over an entire viral genome, and between different viral populations.   More detail is available on the [project's website](http://graphics.cs.wisc.edu/WP/layercake/).


