if [[ ! -f "/tmp/isNixConfigured" && -f ".replit_is_active" ]]; then
  echo "Reconfiguring nix..."

  echo "{ pkgs }: {" > replit.nix
  echo "deps = [" >> replit.nix
  echo "        pkgs.bashInteractive" >> replit.nix
  echo "        pkgs.wget" >> replit.nix
  
  if [ -f "pkgs.nix.txt" ]; then
    cat pkgs.nix.txt >> replit.nix 
    printf "\n" >> replit.nix
  fi

  echo "    ];" >> replit.nix
  echo "}" >> replit.nix

  touch /tmp/isNixConfigured 
  echo "Reconfigured. Please rerun this repl."
  exit
fi

if [ ! -d "code_server" ]; then
  if [[ ! -f ".replit_is_active" ]]; then 
    read -r -p "Are you using replit? (y/n) " input
 
    case $input in
      [yY][eE][sS]|[yY])
        touch .replit_is_active
        echo "Please rerun this bash script, to setup coniguration."
        exit
        ;;
      *)
        touch .noreplit 
        ;;
    esac
  fi
      
  echo "Downloading code server..."
  curl -s https://api.github.com/repos/coder/code-server/releases/latest \
    | grep "browser_download_url.*-linux-amd64.tar.gz" \
    | cut -d : -f 2,3 \
    | tr -d \" \
    | wget -qi -
  
  echo "Extracting code server..."

  mkdir code_server
  cp -r code-server-* code_server/
  cd code_server

  tar -xzvf code-server-*
  rm -rf code-server-*.tar.gz ../code-server-*.tar.gz

  echo "Installing code server..."

  cd ..
  mkdir -p .config/code-server

  echo "bind-addr: 0.0.0.0:8000" > .config/code-server/config.yaml

  read -r -p "Would you like to enable password authentication? [plain-text password] (y/n) " enablePassAuth
  case $enablePassAuth in
    [yY][eE][sS]|[yY])
      read -r -p "Set new plain-text password: " passwd
      echo "auth: password" >> .config/code-server/config.yaml
      echo "password: $passwd" >> .config/code-server/config.yaml
      ;;
    *) 
      echo "auth: none" >> .config/code-server/config.yaml
      ;;
  esac

  echo "cert: false" >> .config/code-server/config.yaml

  mkdir -p data/extensions data/user
fi

# fix for old versions not having user data directories
if [ ! -d "data" ]; then
  mkdir -p data/extensions data/user 
fi

echo "Starting code server... (0.0.0.0:8000)"
code_server/code-s*/bin/code-server --config=.config/code-server/config.yaml --user-data-dir=data/user --extensions-dir=data/extensions 
