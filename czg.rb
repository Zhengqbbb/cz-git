require "language/node"

class Czg < Formula
  desc "Interactive Commitizen CLI that generate standardized commit messages"
  homepage "https://cz-git.qbenben.com/cli/"
  url "https://registry.npmjs.org/czg/-/czg-1.3.6.tgz"
  sha256 "9d1173cf1f4a557d7ae426647ec4ca7679c31fd2186dcbb89053a6e81538fa53"
  license "MIT"

  bottle do
    sha256 cellar: :any_skip_relocation, all: "88fc482aceb30b35537f693da33ea766f1632ce6591aa98f8020e9bb6b342c5a"
  end

  depends_on "node"

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    system "#{bin}/czg", "--version"
    assert_match "czg/#{version}", shell_output("#{bin}/czg --version")
  end
end
