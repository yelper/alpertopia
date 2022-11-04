---
layout: post
title: "A data visualization reading list"
date: 2022-10-06 16:00:00 -0800
categories: vis
teaser: TBD
excerpt: "Capturing the historical context and current state-of-the-art of the discipline"
---

## Why visualization?

Why even visualize data in the first place?  Why not just describe trends with descriptive statistics (mean, standard deviation, correlation values, min/max ranges)?  What's the value of communicating large amounts of data to those who aren't used to dealing with such quantities?

Data visualization research is a mish-mash of several academic fields: statistics, computer graphics, perceptual psychology, mathematics, and the physical sciences (e.g., biology, physics, chemistry) who need visualization of natural phenomena.  With the proliferation of data visualizations into the public sphere (e.g., dashboards, visualizations in newspaper/magazine articles), the fields of rhetoric, communication, accessibility, and education also come into play.

* Robert Kosara: Definition of Visualization. https://eagereyes.org/criticism/definition-of-visualization

A common reference for what "data visualization" is, though this explanation leans more toward berevity instead of completeness. The [/r/dataisbeautiful subreddit](https://old.reddit.com/r/dataisbeautiful/) uses this as its standard for acceptable data visualization submissions.

* Michael Gleicher: What is Vis? https://pages.graphics.cs.wisc.edu/765-21/vis/1-what-is-vis/

My advisor's well-principled post (okay, rant!) about what visualization is, isn't, and what the future of research in this area is.  It's written in a stream-of-consciousness manner that I find endearing, and there's plenty of jumping off links to learn more (in addition to the resources available on the class' website).  As far as introductory articles, this is one of the most complete I know of.

## Data and task abstraction

Data and task abstraction is the academic attempt to abstract lessons from specific visualization representations to re-usable tenents applicable across data domains, characteristics, audiences, and types of representation.  The core idea is that by understanding the efficacy of how people interact with some representation, that knowledge can also be applied to a different visualization&mdash;with potentially a different audience, type of data, or data features&mdash;with similar resulting understanding by visualization viewers.

* Ben Shneiderman (1996). **The Eyes Have It: A Task by Data Type Taxonomy for Information Visualizations**. *Proceedings of the 1996 IEEE Symposium on Visual Languages* (pp. 336–343). [(doi)](http://doi.org/10.1109/VL.1996.545307) [(web pdf)](https://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf)

This paper was one of the first to link the abstraction of data types (number of dimensions or "network"/"tree"/"hierarchical" construction) to what someone might want to visualize about the data.  This helped to "map" out a space where it was clear more work was required and to help collapse the sheer number of design decisions for a particular task/data type down to a reasonable amount.

* Mackinlay, J., Hanrahan, P., & Stolte, C. (2007). **Show Me: Automatic Presentation for Visual Analysis**. *IEEE Transactions on Visualization and Computer Graphics*, 13(6), 1137–44. [(doi)](http://doi.org/10.1109/TVCG.2007.70594) [(web pdf)](https://research.tableau.com/sites/default/files/200711-infovis-showme.pdf)

The basis of Tableau's auto-visualization is with their "Show Me" visualization picker.  When one or more fields are selected in their field list, different visualization types will light up that are appropriate for the cardinality, data type, and cross-relation between the chosen fields.  This paper describes the methodology to determine these rules and how they were received in practice.

* Schulz, H.-J., Nocke, T., Heitzler, M., & Schumann, H. (2013). **A Design Space of Visualization Tasks**. *IEEE Transactions on Visualization and Computer Graphics*, 19(12), 2366–2375. [(doi)](http://doi.org/10.1109/TVCG.2013.120) [(web pdf)](http://vcg.informatik.uni-rostock.de/~hs162/pdf/taskds.pdf)

This paper was one of the most formative papers for me when trying to understand how to "map" out a space where visualization tasks could help to determine what designs were appropriate for what visualizations.  This paper extends previous "mono-dimensional" categorizations to consider multiple factors at a time, leading to an marked increase in expressivity.  In my opinion, this paper moves the closest to "personas" that are directly relevant for considering how different groups of individuals view and interact with a general visualization or dashboard.

* Sarikaya, A. and Gleicher, M. (2018). **Scatterplots: Tasks, Data, and Designs**. *IEEE Transactions on Visualization and Computer Graphics*, 24(1), 402–412. [(doi)](http://dx.doi.org/10.1109/TVCG.2017.2744184) [(web pdf)](https://alper.datav.is/assets/publications/scatterplots/scatterplots-preprint.pdf)

This paper was my attempt to "activate" these data and task taxonomies to direct design decisions for scatterplots.  Might be kinda verbose, but the idea is to help people make better design decisions based on the type of data being visualized and the purported tasks that users will do with that data.

## Critique and Re-design

* Adam Conor and Aaron Irizarry (2015). **Understanding Critique** (Chapter 1 of *Discussing Design*, O’Reilly Books). [Chapter available online as a sampler from the publisher](http://cdn.oreillystatic.com/oreilly/booksamplers/9781491902400_sampler.pdf). (pp. 7-25, 18 pages)

* Fernanda Viégas, Martin Wattenberg: Design and Redesign (2015). https://medium.com/@hint_fm/design-and-redesign-4ab77206cf9

### Irene’s Rules of Critique

It’s definitely helpful to have a reminder!  It is easy to pounce on someone’s work, but it takes quite careful thought to leave an actionable and effective critique.  Thanks again to Irene Rae.

1. Know the purpose of the work
2. Say something good
3. Be specific about problems
4. Don’t dictate
5. It’s about the work, not the person


## Tools for Visualization

* Michael Bostock, Vadim Ogievetsky, Jeffrey Heer. **D3: Data-Driven Documents**. *IEEE InfoVis 2011*. [(doi)](https://doi.org/10.1109%2FTVCG.2011.185) [(web pdf)](http://vis.stanford.edu/files/2011-D3-InfoVis.pdf)
* Z. Liu, et al (2018). **Data Illustrator: Augmenting Vector Design Tools with Lazy Data Binding for Expressive Visualization Authoring**. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (pp. 1-13). [(doi)](https://dx.doi.org/10.1145/3173574.3173697) [(web pdf)](https://data-illustrator.cs.umd.edu/papers/DataIllustratorCHI18.pdf)
* K. Wongsuphasawat, et al (2017). **Vega-Lite: A Grammar of Interactive Graphics**. *IEEE InfoVis 2016*.  [OpenVis Conf 2017 Presentation](https://www.youtube.com/watch?v=9uaHRWj04D4). [(web pdf)](https://idl.cs.washington.edu/files/2017-VegaLite-InfoVis.pdf)


## Graphics and Perception

* kennedy elliott (2016). **39 studies about human perception in 30 minutes**. [(30m presentation)](https://www.youtube.com/watch?v=s0J6EDvlN30) [(blog post)](https://medium.com/@kennelliott/39-studies-about-human-perception-in-30-minutes-4728f9e31a73)

* Lisa Charlotte Muth (2020). **How to pick more beautiful colors for your data visualizations**. https://blog.datawrapper.de/beautifulcolors/

* Michael Correll, Michael Gleicher (2014). **Error Bars Considered Harmful: Exploring Alternate Encodings for Mean and Error**. *IEEE InfoVis 2014*. [(doi)](http://dx.doi.org/10.1109/TVCG.2014.2346298) [(web pdf)](https://graphics.cs.wisc.edu/Papers/2014/CG14/Preprint.pdf)

* Danielle Albers Szafir (2018). **Modeling Color Difference for Visualization Design**. *IEEE InfoVis 2017*. [(doi)](https://doi.org/10.1109/TVCG.2017.2744359) [(web pdf)](http://danielleszafir.com/colordiff_vis2017.pdf)


## Accessible, augmented, and alternative interfaces


## Literacy and education
