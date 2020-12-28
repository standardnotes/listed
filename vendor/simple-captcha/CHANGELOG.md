# Change Log

## [v0.4.3](https://github.com/pludoni/simple-captcha/tree/v0.4.3) (2017-02-20)

-  Allow manual font family overrides #55 to help user on Debian testing with ImageMagick Version 6.9.6

## [v0.4.2](https://github.com/pludoni/simple-captcha/tree/v0.4.2) (2017-02-04)

- Rails 5 compatibility https://github.com/pludoni/simple-captcha/pull/53 by [deivid-rodriguez](https://github.com/deivid-rodriguez)
- For reload button can now also drop jQuery and rely on Prototype or Plain Javascript https://github.com/pludoni/simple-captcha/pull/51 by [bfbones](https://github.com/bfbones)

## [v0.4.0](https://github.com/pludoni/simple-captcha/tree/v0.4.0) (2015-12-29)
[Full Changelog](https://github.com/pludoni/simple-captcha/compare/v0.3.4...v0.4.0)

**Closed issues:**

- Readability of generated image [\#19](https://github.com/pludoni/simple-captcha/issues/19)

**Merged pull requests:**

- Fix mass-assignment error when using protected\_attributes [\#38](https://github.com/pludoni/simple-captcha/pull/38) ([soylent](https://github.com/soylent))
- Add autocorrect = 'off' and autocapitalize = 'off' for iPhone/iPad [\#48](https://github.com/pludoni/simple-captcha/pull/48) ([Friend-LGA](https://github.com/Friend-LGA))
- fix no session request\(api etc\) will never delete expired captcha data [\#46](https://github.com/pludoni/simple-captcha/pull/46) ([beviz](https://github.com/beviz))
- Remove obsolete info from README.md [\#41](https://github.com/pludoni/simple-captcha/pull/41) ([rubyconvict](https://github.com/rubyconvict))
- Add optional possibility to generate captcha partial with HAML [\#40](https://github.com/pludoni/simple-captcha/pull/40) ([aliaksandrb](https://github.com/aliaksandrb))

## [v0.3.4](https://github.com/pludoni/simple-captcha/tree/v0.3.4) (2015-02-05)
[Full Changelog](https://github.com/pludoni/simple-captcha/compare/v0.3.3...v0.3.4)

**Closed issues:**

- Refresh on "Model Based" does not work because of prefixed id on captcha key field [\#29](https://github.com/pludoni/simple-captcha/issues/29)

**Merged pull requests:**

- Little improvements [\#39](https://github.com/pludoni/simple-captcha/pull/39) ([kuldeepaggarwal](https://github.com/kuldeepaggarwal))

## [v0.3.3](https://github.com/pludoni/simple-captcha/tree/v0.3.3) (2015-01-28)
[Full Changelog](https://github.com/pludoni/simple-captcha/compare/v0.3.2...v0.3.3)

**Closed issues:**

- Integration with Devise [\#32](https://github.com/pludoni/simple-captcha/issues/32)
- 404 when image URL is not loaded from rails page [\#24](https://github.com/pludoni/simple-captcha/issues/24)
- Add a class to the text field [\#21](https://github.com/pludoni/simple-captcha/issues/21)
- when i run rails generate simple\_captcha i get "simple\_captcha\_generator.rb:18:in `create\_migration': wrong number of arguments \(3 for 0\) \(ArgumentError\)" [\#18](https://github.com/pludoni/simple-captcha/issues/18)

**Merged pull requests:**

- Add additional check for request [\#36](https://github.com/pludoni/simple-captcha/pull/36) ([incubus](https://github.com/incubus))
- Ruby 2.2.0: Fix warning [\#35](https://github.com/pludoni/simple-captcha/pull/35) ([fmbiete](https://github.com/fmbiete))
- Remove the executable bit from image.rb [\#31](https://github.com/pludoni/simple-captcha/pull/31) ([incubus](https://github.com/incubus))
- Add noise to image [\#28](https://github.com/pludoni/simple-captcha/pull/28) ([lionello](https://github.com/lionello))
- Remove the need for tempfiles [\#27](https://github.com/pludoni/simple-captcha/pull/27) ([lionello](https://github.com/lionello))
- Using absolute URL for img src to support inclusion in non-rails pages [\#26](https://github.com/pludoni/simple-captcha/pull/26) ([lionello](https://github.com/lionello))
- add i18n example for refresh button text [\#23](https://github.com/pludoni/simple-captcha/pull/23) ([Feuda](https://github.com/Feuda))
- Add possibility to set `implode` valude for the generated image [\#20](https://github.com/pludoni/simple-captcha/pull/20) ([mrhead](https://github.com/mrhead))
- Updated README.md [\#16](https://github.com/pludoni/simple-captcha/pull/16) ([rubyconvict](https://github.com/rubyconvict))

## [v0.3.2](https://github.com/pludoni/simple-captcha/tree/v0.3.2) (2014-06-12)
[Full Changelog](https://github.com/pludoni/simple-captcha/compare/v0.3.1...v0.3.2)

**Closed issues:**

- undefined method `apply\_simple\_captcha' for User:Class \(NoMethodError\) [\#14](https://github.com/pludoni/simple-captcha/issues/14)

**Merged pull requests:**

- Fixes \#14 - undefined method 'apply\_simple\_captcha' \(Mongoid\) [\#15](https://github.com/pludoni/simple-captcha/pull/15) ([rubyconvict](https://github.com/rubyconvict))

## [v0.3.1](https://github.com/pludoni/simple-captcha/tree/v0.3.1) (2014-05-24)
[Full Changelog](https://github.com/pludoni/simple-captcha/compare/v0.2.2...v0.3.1)

**Closed issues:**

- simple\_captcha\_valid? is self destructing or something? [\#13](https://github.com/pludoni/simple-captcha/issues/13)
- Gem breaks when middleware placed after mobvious in middleware stack [\#9](https://github.com/pludoni/simple-captcha/issues/9)

## [v0.2.2](https://github.com/pludoni/simple-captcha/tree/v0.2.2) (2014-05-04)
[Full Changelog](https://github.com/pludoni/simple-captcha/compare/v0.3.0...v0.2.2)

## [v0.3.0](https://github.com/pludoni/simple-captcha/tree/v0.3.0) (2014-05-04)
[Full Changelog](https://github.com/pludoni/simple-captcha/compare/v0.2.1...v0.3.0)

**Closed issues:**

- Field key doesn't have a default value [\#7](https://github.com/pludoni/simple-captcha/issues/7)

**Merged pull requests:**

- fix: avoid 'create\_migration' method conflict [\#11](https://github.com/pludoni/simple-captcha/pull/11) ([mzaharie](https://github.com/mzaharie))
- Support for using the same captcha in multiple forms of the same page [\#8](https://github.com/pludoni/simple-captcha/pull/8) ([fmbiete](https://github.com/fmbiete))

## [v0.2.1](https://github.com/pludoni/simple-captcha/tree/v0.2.1) (2013-12-29)
[Full Changelog](https://github.com/pludoni/simple-captcha/compare/v0.2.0...v0.2.1)

**Closed issues:**

- What about publishing a new gem? [\#6](https://github.com/pludoni/simple-captcha/issues/6)
- Captcha image wont show up on Rails 4 [\#1](https://github.com/pludoni/simple-captcha/issues/1)

## [v0.2.0](https://github.com/pludoni/simple-captcha/tree/v0.2.0) (2013-12-01)
[Full Changelog](https://github.com/pludoni/simple-captcha/compare/v0.1.6...v0.2.0)

**Merged pull requests:**

- Fix default gemfile for dummy application [\#5](https://github.com/pludoni/simple-captcha/pull/5) ([freemanoid](https://github.com/freemanoid))
- Correct contributing part of README according to travis config [\#4](https://github.com/pludoni/simple-captcha/pull/4) ([freemanoid](https://github.com/freemanoid))
- Add refresh image button [\#3](https://github.com/pludoni/simple-captcha/pull/3) ([freemanoid](https://github.com/freemanoid))

## [v0.1.6](https://github.com/pludoni/simple-captcha/tree/v0.1.6) (2013-06-24)


\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*
