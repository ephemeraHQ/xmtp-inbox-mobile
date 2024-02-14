#!/bin/sh

# include helpers
source retry.sh

echo "####===== Stage: PRE-Xcode Build is activated .... "

cat > ../../.env <<EOF
XMTP_ENV=${XMTP_ENV}
THRID_WEB_CLIENT_ID=${THRID_WEB_CLIENT_ID}
AWS_S3_REGION=${AWS_S3_REGION}
AWS_S3_BUCKET=${AWS_S3_BUCKET}
AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
EOF

# Debug output for ENV variables
# Note: Values are encrypted in CI host.
# Output will result as: XMTP_ENV=****
# echo "####===== Temporary ENV Debug"
# cat ../../.env

echo "###===== Installing Ruby"
retry 5 brew install ruby

echo "###===== Add Ruby to PATH"
if [[ -d "/opt/homebrew" ]]; then
    HOMEBREW_PREFIX="/opt/homebrew"
else
    HOMEBREW_PREFIX="/usr/local"
fi

echo "export PATH=\"$HOMEBREW_PREFIX/opt/ruby/bin:\$PATH\"" >> ~/.zshrc

echo "verify path:" $PATH

source ~/.zshrc

echo "###===== Verify Ruby installation"
ruby -v

# Ensure the gem bin directory is in the PATH
echo "export PATH=\"$(ruby -e 'puts Gem.user_dir')/bin:\$PATH\"" >> ~/.zshrc
source ~/.zshrc

echo "###===== Install bundler"
which gem
gem install bundler:2.1.4 --user-install

echo "###===== Checking bundler version"
which bundler

echo "###===== Source the updated .zshrc to apply changes in the current script"
source ~/.zshrc

echo "###===== Verify bundler installation"
bundler -v

echo "####===== Change working directory"
cd ../../

echo "###===== Installing Node"
retry 5 brew install node

echo "###===== Installing Yarn"
npm install --global yarn

echo "####===== Run: yarn install"
yarn install

#echo "####===== Run bundle install"
# bundle install // bundle installs the wrong version of Flipper

echo "####===== brew tap Cocoapods 1.14.3"
brew tap-new $USER/local-tap 
brew tap homebrew/core --force
brew extract --version=1.14.3 cocoapods $USER/local-tap
brew install cocoapods@1.14.3

echo "####===== Check Cocoapods versions"
pod --version

echo "####===== Change directory and run pod install"
cd ios
pod install

#echo "####===== Run bundle exec pod install"
#bundle exec pod install --project-directory=ios // bundle installs the wrong version of Flipper

exit 0
