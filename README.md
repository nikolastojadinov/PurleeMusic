# 🎵 PurpleBeats

PurpleBeats is a modern React music streaming application that combines Pi Network authentication with Supabase storage for a seamless music listening experience.

## ✨ Features

- **Pi Network Authentication**: Secure login using Pi Network SDK
- **Music Streaming**: Stream audio files directly from Supabase Storage
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Audio Controls**: Built-in HTML5 audio players for each track
- **Modern UI**: Beautiful gradient design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Supabase account
- Pi Network developer account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nikolastojadinov/PurleeMusic.git
   cd PurleeMusic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory with your configuration:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   REACT_APP_PI_APP_ID=your_pi_network_app_id
   ```

   You can copy from the example file:
   ```bash
   cp .env.example .env
   ```

### Supabase Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Create a storage bucket** named `music`:
   - Go to Storage in your Supabase dashboard
   - Create a new bucket named `music`
   - Make the bucket public or configure appropriate access policies

3. **Upload audio files** to the `music` bucket:
   - Supported formats: `.mp3`, `.wav`, `.ogg`, `.m4a`
   - Files will automatically appear in your PurpleBeats library

4. **Get your credentials**:
   - Find your project URL and anon key in Settings > API
   - Add them to your `.env` file

### Pi Network Setup

1. **Register your app** on the Pi Network Developer Portal
2. **Get your App ID** and add it to your `.env` file
3. **Configure authentication** settings in the Pi Developer dashboard

## 🎯 Usage

1. **Start the development server**
   ```bash
   npm start
   ```

2. **Open your browser** and navigate to `http://localhost:3000`

3. **Authenticate** with Pi Network to access the music library

4. **Upload music** to your Supabase `music` bucket to see tracks appear

## 🏗️ Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🌐 Deployment

### Deploy to Replit

1. **Fork this repository** on GitHub

2. **Import to Replit**:
   - Go to [Replit](https://replit.com)
   - Click "Create Repl"
   - Choose "Import from GitHub"
   - Enter your repository URL

3. **Set environment variables** in Replit:
   - Go to the "Secrets" tab in your Repl
   - Add your environment variables:
     - `REACT_APP_SUPABASE_URL`
     - `REACT_APP_SUPABASE_ANON_KEY`
     - `REACT_APP_PI_APP_ID`

4. **Install dependencies and build**:
   ```bash
   npm install
   npm run build
   ```

5. **Configure the run command** in `.replit`:
   ```
   run = "npm start"
   ```

6. **Deploy**: Click the "Run" button in Replit

### Deploy to Other Platforms

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Upload the build folder to Netlify
```

#### Heroku
```bash
# Add buildpack
heroku buildpacks:set mars/create-react-app

# Deploy
git push heroku main
```

## 🛠️ Development

### Project Structure

```
src/
├── components/          # React components
│   ├── Login.tsx       # Pi Network authentication
│   ├── Navbar.tsx      # Navigation bar
│   ├── MusicLibrary.tsx # Music listing
│   └── MusicPlayer.tsx # Audio player component
├── hooks/              # Custom React hooks
│   ├── usePiAuth.ts   # Pi Network authentication logic
│   └── useMusic.ts    # Supabase music fetching logic
├── lib/               # Utility libraries
│   └── supabase.ts   # Supabase client configuration
├── App.tsx           # Main application component
### Available Scripts

- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App (⚠️ irreversible)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_SUPABASE_URL` | Your Supabase project URL | Yes |
| `REACT_APP_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `REACT_APP_PI_APP_ID` | Your Pi Network application ID | Yes |

### Supabase Storage Configuration

Make sure your `music` bucket has the correct access policies:

```sql
-- Allow public access to files in the music bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('music', 'music', true);

-- Create policy for public read access
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'music');
```

## 🎨 Customization

### Styling
- CSS files are located next to their respective components
- Global styles are in `src/App.css`
- The app uses a purple gradient theme that can be customized

### Adding Features
- Authentication logic is in `src/hooks/usePiAuth.ts`
- Music fetching logic is in `src/hooks/useMusic.ts`
- Components are modular and easy to extend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check that your environment variables are correctly set
2. Verify your Supabase bucket configuration
3. Ensure your Pi Network app is properly configured
4. Check the browser console for error messages

For additional help, please open an issue on GitHub.

---

Built with ❤️ using React, Supabase, and Pi Network

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
