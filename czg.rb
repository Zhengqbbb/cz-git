require "language/node"

class Czg < Formula
  desc "Interactive Commitizen CLI that generate standardized commit messages"
  homepage "https://cz-git.qbenben.com/cli/"
  url "https://registry.npmjs.org/czg/-/czg-1.3.5.tgz"
  sha256 "1de551dd4b5103729eab6eafd981e6250115b82a1e133b144379499f2b419bbf"
  license "MIT"
  head "https://github.com/Zhengqbbb/cz-git.git", branch: "main"

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
