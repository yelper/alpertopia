# alpertopia
Jekyll-driven homepage

### Installation instructions (Windows)

1. Get Ruby using [RubyInstaller](https://rubyinstaller.org/downloads/); Ruby 2.4 or better is recommended
2. Install jekyll and bundler through `gem install jekyll bundler`
3. Set up the Jekyll site by running `bundler install`
4. Start serving site by running `jekyll serve`; will watch and rebuild when anything other than `_config.yml` is saved
5. Commit once site is acceptable; `git push origin deploy` will push to server (make sure SSH public key is in `authorized_hosts` on webserver)
    * If the server doesn't have jekyll installed globally (thanks MT), manually execute `hooks/post-receive` (e.g., [here](https://jekyllrb.com/docs/deployment-methods/#git-post-receive-hook))
