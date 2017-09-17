--- 
layout: publication
articletitle: "Sequence Pre-processing: Focusing Analysis of Log Event Data"
presented: "IEEE VIS 2016"
conf: infovis

bibtextype: proceedings
publication: "Proceedings of the IEEE VIS 2016 Workshop on Temporal & Sequential Event Analysis"
authors: 
- Alper Sarikaya
- Emanuel Zgraggen
- Rob DeLine
- Steven Drucker
- Danyel Fisher
volume: 
number: 
pagestart: 
pageend: 
doi: 
datepublished: 2016-10-25

link_paperlink: EVENT_2016_paper_12.pdf
link_suppl: 
link_labrepo: https://eventevent.github.io/papers/EVENT_2016_paper_12.pdf
video_teaser: 
video_paper: 
website_project: 
website_repo: 
talk_slides: event_log_preprocessing.pdf
talk_video:

thumbnail: 
imgteaser: 
figure1: fig3.png
caption1: |
     An example composition of pre-processing rules for an exemplar session of log events, using data from the Histogram Excel Add-in.
     A set of repeated slider events is replaced by a single slider event, then the session is split when new data is loaded.
     Finally, only sessions containing a frequency event are selected for downstream analysis.

     We demonstrate how these actions can help to focus log data for downstream analysis.
figure2: 
caption2: 

excerpt: Identified methods for focusing large amounts of log event data for downstream analysis and provenance.

postdate: 2017-09-17 15:05:00 -0700
categories: vis design-study taxonomy log-data
---

This work was presented at [the Workshop on Temporal & Sequential Event Analysis](https://eventevent.github.io) at IEEE VIS in 2016.

Log event data are become increasingly prevalent in analysis scenarios. In this work, we identify several common trends of noise that appear in telemetry or machine log data. We then propose multiple methods for pre-processing this data, and how these methods may integrate into the analysis workflow to help focus the analysis. We envision that these methods could be used in an iterative fashion in a future visual analytics tool and become a valuable provenance component of such visualizations.
